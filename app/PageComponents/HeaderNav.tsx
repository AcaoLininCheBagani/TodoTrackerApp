import Link from "next/link";
export default function HeaderNav() {
  const navName = [
    { name: "Task", link: "/todo" },
    { name: "Dashboard", link: "/dashboard" },
  ];
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navName.map((element, key) => (
        <Link
          href={element.link}
          key={key}
          className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
        >
          {element.name}
        </Link>
      ))}
    </nav>
  );
}
