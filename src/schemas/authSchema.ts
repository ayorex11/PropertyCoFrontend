import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  username: z.string().email("Invalid email"),
  password1: z.string().min(8, "Password must be at least 8 characters"),
  password2: z.string().min(8, "Confirm password is required"),
  phone_number: z.string().min(5, "Phone number required"),
  country_code: z.union([
    z.string(),
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ]),
  account_type: z.enum(["Agent", "User"]),
}).refine((data) => data.password1 === data.password2, {
  path: ["password2"],
  message: "Passwords do not match",
});

export type RegisterPayload = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
  username: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginPayload = z.infer<typeof loginSchema>;


export const updatePasswordSchema = z.object({
  new_password1: z.string().min(8, "Password must be at least 8 characters"),
  new_password2: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.new_password1 === data.new_password2, {
  path: ["password2"],
  message: "Passwords do not match",
});

export type UpdatePasswordPayload = z.infer<typeof updatePasswordSchema>;