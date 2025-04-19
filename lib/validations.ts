import { z } from "zod";

export const signUpschema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(8),
});

export const signInschema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().int().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  description: z.string().trim().min(10).max(1000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-Fa-f]{6}$/),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
});
