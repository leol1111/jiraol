import { z } from "zod";

export const createWorkpaceSchema = z.object({
    name: z.string().trim().min(1, "Required")
})