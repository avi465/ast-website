import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.string(),
  status: z.string(),
  price: z.number(),
  discount: z.number(),
  updatedAt: z.string(),
});
