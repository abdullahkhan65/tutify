export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-teal-700/8 rounded-full blur-3xl" />
      <div className="relative w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
}
