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
  password: z.string().nonempty().min(8)
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
      path: ["password"],
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
      path: ["password"],
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one digit",
      path: ["password"],
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
      message: "Password must contain at least one special character",
      path: ["password"],
    }),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
