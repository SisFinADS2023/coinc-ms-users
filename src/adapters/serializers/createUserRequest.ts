import * as z from "zod";

/**name e lastName */
export const CreateUserRequestSchema = z.object({
  name: z.string().nonempty().refine(value => !/\d/.test(value), {
    message: 'Nome não pode conter caracteres numéricos',
  }),
  lastName: z.string().nonempty().refine(value => !/\d/.test(value), {
    message: 'Soberenome não pode conter caracteres numéricos',
  }),
  email: z.string().nonempty().email().refine(value => value.includes('@') && value.includes('.com'), {
    message: 'O email inserido é inválido',
  }),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
