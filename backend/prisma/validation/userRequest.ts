import { z } from 'zod'

export const RegisterUser = z.object({
   name: z.string().nonempty({message: "Silakan masukkan nama"}),
   email: z.string(
    {
      required_error: "Email diperlukan"
    }
   ).email({message: " Email harus berupa email yang valid"}),
   password: z.string().min(8, {message: "Minimal password memiliki 8 karakter"}),
   confPassword: z.string().min(8, {message: "Minimal password memiliki 8 karakter"})
 }).refine((data) => data.password === data.confPassword, {
   message: " Password tidak cocok",
   path: ["confPassword"]
 })

export const LoginUser = z.object({
  email: z.string().nonempty({message: "Email diperlukan"}),
  password: z.string().min(8, {message: "Minimal password memiliki 8 karakter"})
})