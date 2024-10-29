import { z } from "zod";

export const loginScheme = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Required")
});

export const registerScheme = z.object({
    name: z.string().trim().min(1, "Required"),
    email: z.string().email(),
    password: z.string().min(8, "Minimum of 8 characters")
})