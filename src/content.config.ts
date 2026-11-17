import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

export const collections = {
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        description: z.string().min(10),
        translation: z.object({
          source: z.literal("en"),
          status: z.enum(["complete", "needs-review", "untranslated"]),
          sourceVersion: z.string(),
          sourceHash: z
            .string()
            .regex(/^[a-f0-9]{64}$/)
            .optional(),
        }),
      }),
    }),
  }),
};
