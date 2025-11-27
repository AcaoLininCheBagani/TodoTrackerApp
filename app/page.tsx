// app/page.tsx
"use client";

import { useState } from "react";
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";

export default function HomePage() {
  const [activeForm, setActiveForm] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="flex min-h-screen">
          {/* Left Side - Hero Content */}
          <div className="hidden md:flex md:flex-1 flex-col justify-center px-12">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-blue-600">TaskMaster</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Organize your life, boost your productivity, and achieve your
                goals with our intuitive task management platform.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Manage tasks effortlessly
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Set priorities and deadlines
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">
                    Collaborate with your team
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
              {/* Form Toggle */}
              <div className="flex mb-8 bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setActiveForm("login")}
                  className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                    activeForm === "login"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveForm("register")}
                  className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                    activeForm === "register"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Forms */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {activeForm === "login" ? <LoginForm /> : <RegisterForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
