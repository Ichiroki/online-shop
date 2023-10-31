import { z } from 'zod'

export const RegisterUser = z.object({
   name: z.string().nonempty({message: "Name is required"}),
   email: z.string().nonempty({message: "Email is required"}).email({message: " Email must be a valid email"}),
   password: z.string().min(8, {message: "Minimum password have 8 characters"}),
   confPassword: z.string().min(8, {message: "Minimum password have 8 characters"})
 }).refine((data) => data.password === data.confPassword, {
   message: " Password does not match",
   path: ["password"]
 })

export const LoginUser = z.object({
  email: z.string().nonempty({message: "Email is required"}),
  password: z.string().min(8, {message: "Minimum password have 8 characters"})
})