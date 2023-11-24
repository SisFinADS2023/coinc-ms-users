import * as z from "zod";

/**name e lastName */
export const CreateUserRequestSchema = z.object({
  name: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().nonempty(),
  password: z.string().nonempty(),
});
// password: z.string().nonempty().min(8)
// .refine((value) => /[a-z]/.test(value), {
//     message: "Password must contain at least one lowercase letter",
//     path: ["password"],
// })
// .refine((value) => /[A-Z]/.test(value), {
//     message: "Password must contain at least one uppercase letter",
//     path: ["password"],
// })
// .refine((value) => /\d/.test(value), {
//     message: "Password must contain at least one digit",
//     path: ["password"],
// })
// .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
//     message: "Password must contain at least one special character",
//     path: ["password"],
// }),
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
