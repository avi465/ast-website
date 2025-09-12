import z from "zod";

export const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  status: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  updatedAt: z.string(),
});
