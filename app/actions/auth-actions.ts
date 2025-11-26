"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const cookieStore = await cookies();
  try {
    const response = await fetch("http://localhost:10000/api/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      const user = {
        id: userData.user.id,
        name: userData.user.name,
        email: userData.user.email,
      };

      cookieStore.set("auth-token", userData.token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
      });
      return {
        succes: true,
        user: user,
        path: "/todo",
      };
    } else {
      const errorData = await response.json();
      return {
        succes: false,
        errorData: errorData.message || "Invalid email or password",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      succes: false,
      errorData: error || "Network error. Please try again.",
    };
  }
};

export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  return {
    succes: true,
    path: "/",
  };
};
