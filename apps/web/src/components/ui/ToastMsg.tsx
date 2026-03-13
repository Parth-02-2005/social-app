import React, { useEffect, useState } from 'react';

type ToastMsgProps = {
    title: string;
    description?: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose?: () => void;
};

export const ToastMsg: React.FC<ToastMsgProps> = ({
    title,
    description,
    type = 'info',
    duration = 3000,
    onClose
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!isVisible) return null;

    const types = {
        success: 'border-[var(--palm)] bg-[#edf9f3] text-[var(--palm)]',
        error: 'border-[#e05252] bg-[#fdf2f2] text-[#a03030]',
        info: 'border-[var(--lagoon)] bg-[var(--surface-strong)] text-[var(--sea-ink)]',
    };

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] border-l-4 rounded-lg shadow-xl p-5 rise-in ${types[type]}`}
            style={{
                boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.05)'
            }}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                    <h4 className="font-bold text-[15px]">{title}</h4>
                    {description && <p className="text-sm mt-1.5 opacity-90 leading-snug">{description}</p>}
                </div>
                {(onClose || duration <= 0) && (
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            if (onClose) onClose();
                        }}
                        className="text-current opacity-50 hover:opacity-100 transition-opacity cursor-pointer p-1"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};
