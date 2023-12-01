import * as z from "zod";

/**name e lastName */
export const UpdateUserRequestSchema = z.object({
  _id: z.string().nonempty(),

  name: z.string().refine(value => !/\d/.test(value), {
    message: 'Nome não pode conter caracteres numéricos',
  }),
  lastName: z.string().refine(value => !/\d/.test(value), {
    message: 'Soberenome não pode conter caracteres numéricos',
  }),
  email: z.string().email().refine(value => value.includes('@') && value.includes('.com'), {
    message: 'O email inserido é inválido',
  }),
  password: z.string().min(8)
    .refine((value) => /[a-z]/.test(value), {
      message: "A senha deve conter pelo menos uma letra minúscula",
      path: ["password"],
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "A senha deve conter pelo menos uma letra maiúscula",
      path: ["password"],
    })
    .refine((value) => /\d/.test(value), {
      message: "A senha deve conter pelo menos um dígito",
      path: ["password"],
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
      message: "A senha deve conter pelo menos um caractere especial",
      path: ["password"],
    }),
});

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
