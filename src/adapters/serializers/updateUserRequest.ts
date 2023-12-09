import * as z from "zod";

/**name e lastName */
export const UpdateUserRequestSchema = z.object({
  name: z.string().refine((value) => !/\d/.test(value), {
    message: "Nome não pode conter caracteres numéricos",
  }),
  lastName: z.string().refine((value) => !/\d/.test(value), {
    message: "Soberenome não pode conter caracteres numéricos",
  }),
  email: z
    .string()
    .email()
    .refine((value) => value.includes("@") && value.includes(".com"), {
      message: "O email inserido é inválido",
    }),
});

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
