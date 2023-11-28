import { z } from 'zod'

export const RegisterUser = z.object({
   name: z.string(
    {
      required_error: "Silakan masukkan nama",
      invalid_type_error: "Nama tidak boleh karakter lain selain huruf"
    }
   ),
   email: z.string(
    {
      required_error: "Email is required"
    }
   ).email({message: " Email must be a valid email"}),
   password: z.string().min(8, {message: "Minimum password have 8 characters"}),
   confPassword: z.string().min(8, {message: "Minimum password have 8 characters"})
 }).refine((data) => data.password === data.confPassword, {
   message: " Password does not match",
   path: ["confPassword"]
 })

export const LoginUser = z.object({
  email: z.string().nonempty({message: "Email is required"}),
  password: z.string().min(8, {message: "Minimum password have 8 characters"})
})