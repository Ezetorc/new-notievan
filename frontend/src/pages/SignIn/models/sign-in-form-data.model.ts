import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .email({ "error": "Lo que ingresaste no es un email" })
    .min(1, "El email es obligatorio")
    .max(100, "El email no puede tener más de 100 carácteres"),

  password: z
    .string()
    .min(6, "La contraseña no puede tener menos de 6 carácteres")
    .max(150, "La contraseña no puede tener más de 150 carácteres"),
});

export type SignInFormData = z.infer<typeof SignInSchema>;