export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_25%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom_left,rgba(129,140,248,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.12),transparent_25%)]" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
