import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-[var(--lagoon-deep)] text-white hover:bg-[var(--lagoon)] shadow-md',
        secondary: 'bg-[var(--surface-strong)] text-[var(--sea-ink)] hover:bg-[var(--surface)] shadow-sm border border-[var(--line)]',
        outline: 'bg-transparent border-2 border-[var(--lagoon)] text-[var(--lagoon-deep)] hover:bg-[rgba(79,184,178,0.1)]',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
