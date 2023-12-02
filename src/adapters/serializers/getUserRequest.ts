import * as z from "zod";

export const GetUserRequestSchema = z.object({
  _id: z.string().nonempty(),
});

export type GetUserRequest = z.infer<typeof GetUserRequestSchema>;
