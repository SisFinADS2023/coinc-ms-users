import * as z from "zod"

export const GetUserRequestSchema = z.object({
  user_id: z.string().nonempty(),
})

export type GetUserRequest = z.infer<typeof GetUserRequestSchema>
