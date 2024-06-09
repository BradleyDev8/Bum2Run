import { z } from "zod";

export const trainingSchema = z.object({
  raceDistance: z.string(),
  effortLevel: z.string(),
  weeklyDistance: z.string(),
});

export type Training = z.infer<typeof trainingSchema>;
