import * as z from 'zod'

const productSchema = z.object({
    code: z.string().min(2).max(50),
    name: z.string().min(2).max(100),
    price: z.number().positive(),
    stock: z.number().int().nonnegative()
}).strict()

export const validateProduct = (data) => {
    return productSchema.safeParse(data)
}

const addStockSchema = z.object({
    stock_to_add: z.number().int().positive('Debe ser un número entero mayor a 0')
}).strict()

export const validateAddStock = (data) => {
    return addStockSchema.safeParse(data)
}
