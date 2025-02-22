import { z } from 'zod'

export const userRegisterSchema = z.object({
  username: z.string().max(20, 'Username is too long'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password is too short'),
  repeatpassword: z.string().min(6, 'Repeat password must be at least 6 characters long'),
})

export const userProfileSchema = z.object({
  // id: z.number().int("ID must be an integer"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  profile: z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    bio: z.string().max(160, "Bio must be 160 characters or less").optional(),
    avatar: z.string().url("Invalid URL for avatar").optional(),
  }),
})

export const commisionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  description: z.string().min(4, "Description must be at least 10 characters."),
})

export type UserProfileFormData = z.infer<typeof userProfileSchema>