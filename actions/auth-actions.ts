"use strict";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/zod-schemas";
import { AuthError } from "next-auth";

export async function register(formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already exists" };
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: "User created! You can now login." };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}
