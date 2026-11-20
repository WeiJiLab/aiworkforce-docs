Build a Cosmos workflow that turns a published Figma design into a production-ready pull request.

Trigger: a Figma "file published" or "component updated" event, or a manual trigger with a Figma frame URL.

Steps:
1. Read the Figma frame via the Figma MCP. Extract: the component hierarchy, all design tokens (colors, spacing, radii, shadows, typography), responsive breakpoints, interactive states (hover, focus, disabled, loading), and any annotations the designer added.
2. Map the design to the project's existing design system. Identify which existing components, tokens, and utility classes can be reused. Flag new tokens or patterns that don't exist yet and need to be added to the design system.
3. Decision: "New design-system tokens needed?".
   - If yes, generate the token additions in the design-system package as a separate commit, to be reviewed first.
   - In both cases, continue.
4. Generate the component code in the project's stack (React/TypeScript, Vue, etc.) following the conventions in AGENTS.md. Use the mapped design-system primitives. Include: prop types, accessibility attributes (ARIA roles, labels), responsive styles, and interactive state handling.
5. Write Storybook stories (or the equivalent) for the main states: default, hover, focus, disabled, and any data-driven variants visible in the Figma frame.
6. Render the component in a headless browser and take a screenshot at each configured viewport.
7. Run a visual diff between the rendered screenshot and the original Figma frame export. Compute pixel-level and structural similarity scores.
8. Decision: "Within visual tolerance?". Use a configurable threshold (default: 95% similarity).
   - If no, identify the largest discrepancies, patch the component, re-render, and re-diff. Repeat up to a retry limit.
   - If yes, continue.
9. Open a pull request with: the component code, the Storybook stories, the visual diff images (Figma vs rendered), and a link to the original Figma frame for reference.

Constraints:
- Always include the side-by-side visual diff in the PR so reviewers can verify fidelity without opening Figma.
- Never commit generated code without at least one Storybook story: undocumented components accumulate design debt.
- Token additions must be in a separate commit from component code so they can be reviewed and merged independently.