import React, { useRef, useState } from "react";
import { ChevronDown, Settings, LogOut, Menu, X as XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { HeaderProps } from "../entities/todos";
import { logoutAction } from "../actions/auth-actions";
export default function HeaderProfile({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: HeaderProps) {
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const userData = useRef<string>("");

  const handleLogout = async () => {
    // In a real app, this would handle authentication logout
    console.log("User logged out");
    setIsProfileMenuOpen(false);
    const res = await logoutAction();
    if (res) {
      localStorage.removeItem("user");
      router.push(res.path);
    }
  };

  const handleSettings = () => {
    setIsProfileMenuOpen(false);
    router.push("/profile");
  };

  const getUserLocal = (u: string) => {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      if (u == "id") return user.id;
      if (u == "name") return user.name;
      if (u == "email") return user.email;
    }
  };
  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {getUserLocal("name")}
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700">
            {getUserLocal("name")}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
        </button>

        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {getUserLocal("name")}
              </p>
              <p className="text-xs text-gray-500"> {getUserLocal("email")}</p>
            </div>
            <button
              onClick={handleSettings}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        {isMobileMenuOpen ? (
          <XIcon className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </>
  );
}
