import * as z from "zod";

export const GetUserRequestSchema = z.object({
  userId: z.string().nonempty(),
});

export type GetUserRequest = z.infer<typeof GetUserRequestSchema>;
