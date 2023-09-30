import * as z from "zod"

export const CreateUserRequestSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().nonempty(),
    documentNumber: z.string().nonempty(),
    password: z.string().nonempty()
})

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>