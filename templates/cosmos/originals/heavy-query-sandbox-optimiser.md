Build a Cosmos workflow that continuously finds heavy database queries and benchmarks lighter rewrites in a sandbox before shipping the winner.

Trigger: continuous: on every new entry in the slow-query log, plus a periodic sweep of the APM / pg_stat_statements top-N by total time and total bytes returned.

Steps:
1. Collect candidate queries from the slow-query log, pg_stat_statements / Performance Schema, and the APM trace stream. Normalise them (parameterise literals) so duplicates collapse into one fingerprint.
2. Rank queries by cost. Combine total execution time, mean time, calls per minute, rows scanned, bytes returned over the network, and lock wait time. Keep the top offenders.
3. Decision: "Worth optimizing?". Skip queries that are already cheap, run rarely, or are dominated by client-side wait. If not worth it, record the finding and end.
4. Pull the context for each kept query: the table schemas, current indexes, the EXPLAIN ANALYZE plan, partitioning, recent migrations, and a representative parameter set captured from production traffic.
5. Generate rewrite candidates. The agent proposes several independent strategies, for example:
   - rewrite the SQL (push predicates down, replace correlated subqueries with joins, switch IN to EXISTS, project fewer columns, paginate properly)
   - add a covering or partial index
   - add a materialized view or a summary table
   - batch the call site instead of issuing N queries
   - denormalise a hot column
6. Provision a sandboxed replica that mirrors the production schema and a recent, anonymised data snapshot. Reset it between runs so candidates do not pollute each other.
7. For each candidate, including the unchanged baseline:
   - apply the migration / index in the sandbox
   - run the query with the captured parameter set, warm and cold
   - record execution time (p50 / p95), rows scanned, rows returned, bytes returned over the network, buffers read, index hit ratio, and any lock waits
   - confirm the result set is equivalent to the baseline
8. Decision: "Result-equivalent and meaningfully faster?". A candidate must return the same rows AND beat the baseline by a configured margin on time and / or bandwidth without regressing the others.
   - If no candidate qualifies, write the findings to the optimisation log and end.
   - If yes, continue.
9. Pick the best candidate. Tie-break by lowest write-amplification, smallest index footprint, simplest migration.
10. Open a pull request with the rewrite or migration, the EXPLAIN diff, the benchmark table comparing every candidate, and a rollout note (locking implications, expected index build time, how to roll back).

Constraints:
- Never run candidates against production. Every benchmark goes through the sandbox replica.
- Always verify result equivalence before declaring a winner: a faster query that returns different rows is a regression.
- Keep the optimisation log append-only so we can build trend dashboards (queries optimised, time saved, bandwidth saved) over time.