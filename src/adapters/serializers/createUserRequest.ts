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
  password: z.string().nonempty().min(8).refine(value => /[a-z]/i.test(value) && /\d/.test(value), {
    message: 'A senha precisa conter 8 caracteres e possuir pelo menos uma letra e um número',
  }),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
