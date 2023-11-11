import * as z from "zod";

/**name e lastName */
export const CreateUserRequestSchema = z.object({
  name: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().nonempty(),
  documentNumber: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
