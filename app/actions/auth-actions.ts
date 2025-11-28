"use server";
import { cookies } from "next/headers";

export const loginAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const cookieStore = await cookies();
  try {
    const response = await fetch(
      "https://express-todo-api-u2nx.onrender.com/api/user-login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

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

export const createUserAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  try {
    const response = await fetch(
      "https://express-todo-api-u2nx.onrender.com/api/user-create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      },
    );
    if (response.ok) {
      const userData = await response.json();
      return {
        success: true,
        message: userData.message || "Successfully created account.",
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Registration failed",
      };
    }
  } catch (error) {
    console.error("Network error:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};
