import React from "react";

interface SlideLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  isActive: boolean;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({
  title,
  subtitle,
  children,
  isActive,
}) => {
  if (!isActive) return null;

  return (
    <div className="h-full w-full flex flex-col p-2 animate-[fadeIn_0.5s_ease-in-out]">
      {(title || subtitle) && (
        <header className="mb-4 border-b border-presentation-secondary/30 pb-4 shrink-0">
          {title && (
            <h1 className="text-3xl font-bold text-presentation-accent tracking-tight leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <h2 className="text-sm text-presentation-secondary mt-1 font-light leading-snug">
              {subtitle}
            </h2>
          )}
        </header>
      )}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {children}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
