import React, { useState } from 'react';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    error,
    className = '',
    type,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-[var(--sea-ink-soft)]">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={inputType}
                    className={`w-full px-4 py-3 rounded-xl border bg-[var(--surface-strong)] text-[var(--sea-ink)] placeholder-[rgba(23,58,64,0.4)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--lagoon)] focus:border-transparent transition duration-200 ${error ? 'border-red-500' : 'border-[var(--line)]'
                        }`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--sea-ink-soft)] hover:text-[var(--lagoon-deep)] transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line><path d="M9 9a3 3 0 0 1 3 3"></path></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        )}
                    </button>
                )}
            </div>
            {error && <span className="text-xs font-semibold text-red-500 mt-1">{error}</span>}
        </div>
    );
};
