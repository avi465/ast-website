import { z } from "zod";

export const sectionSchema = z.object({
  _id: z.string(),
  name: z.string(),
  language: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  details: z.string(),
  status: z.string(),
  price: z.number(),
  discount: z.number(),
  updatedAt: z.string(),
});
