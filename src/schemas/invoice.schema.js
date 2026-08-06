import * as z from 'zod'

const invoiceItemSchema = z.object({
    product_id: z.number().int().positive(),
    quantity: z.number().int().positive()
}).strict()

const invoiceSchema = z.object({
    customer_name: z.string().min(2).max(150),
    customer_rtn_id: z.string().max(20).optional(),
    items: z.array(invoiceItemSchema).min(1, 'Debe incluir al menos un producto')
}).strict()

export const validateInvoice = (data) => {
    return invoiceSchema.safeParse(data)
}
