export function Shell({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-shell px-6 ${className}`}>{children}</div>;
}
