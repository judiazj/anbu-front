
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
      <div className={`p-4 bg-gray-800 rounded-lg shadow-lg ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="mt-2">{children}</div>;
  }
  