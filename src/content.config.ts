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
        status: z
          .enum(["available", "beta", "limited", "planned"])
          .default("available"),
        audience: z
          .array(z.enum(["user", "builder", "developer", "platform-engineer"]))
          .optional(),
        product_area: z.string().min(2).optional(),
        last_verified: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .optional(),
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
