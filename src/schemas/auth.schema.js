import * as z from "zod";

export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6)
}).strict()

export const ValidacionSchema = (data) => {
    return loginSchema.safeParse(data)
}