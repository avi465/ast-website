import z from "zod";

import { description } from "../../default/_components/chart-area-interactive";

export const streamSchema = z.object({
  streamKey: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const lessonSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  type: z.string(),
  status: z.string(),
  videoUrl: z.string().optional(),
  stream: streamSchema,
  instructor: z.string(),
  updatedAt: z.string(),
});
