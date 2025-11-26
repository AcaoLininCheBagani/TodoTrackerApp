import Header from "../PageComponents/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="mt-16">{children}</main>
    </div>
  );
}
