import { z } from "zod";

// For Write a blog form
export const WriteBlogSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required at least 1 character!" }),
  content: z.string().min(10, {
    message: "Content is required at least 10 characters!",
  }),
  category: z.string().min(1),
  estimateTime: z.string().time(),
});

export type WriteBlog = z.infer<typeof WriteBlogSchema>;

// ------------

// For Write a comment form
export const WriteCommentsSchema = z.object({
  content: z
    .string()
    .min(1, { message: "The comment cannot be blank!" })
    .optional(),
});

export type WriteCommentsType = z.infer<typeof WriteCommentsSchema>;

// ----------

// For sign in form
export const SignInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password cannot be blank!").trim(),
});

export type SignInType = z.infer<typeof SignInSchema>;

// --------

// For sign up form
export const SignUpSchema = z
  .object({
    email: z.string().trim().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .trim()
      .max(40),
    confirmPassword: z.string().trim(),
    firstName: z.string().trim().max(20),
    lastName: z.string().trim().max(20),
    displayName: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpType = z.infer<typeof SignUpSchema>;
