import * as z from "zod";

/**name e lastName */
export const UpdateUserRequestSchema = z.object({
  name: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
