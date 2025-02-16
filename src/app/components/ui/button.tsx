
export function Button({
    children,
    onClick,
    className,
    variant = 'primary',
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary';
  }) {
    const baseStyles = `px-4 py-2 rounded text-white font-semibold focus:outline-none transition`;
    const variantStyles =
      variant === 'primary'
        ? 'bg-blue-600 hover:bg-blue-700'
        : 'bg-gray-600 hover:bg-gray-700';
  
    return (
      <button onClick={onClick} className={`${baseStyles} ${variantStyles} ${className}`}>
        {children}
      </button>
    );
  }
  