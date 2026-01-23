import { useState, type ReactNode } from 'react';

type AccordionProps = {
  title: string;
  children: ReactNode;
  disabled?: boolean;
  defaultOpen?: boolean;
  className?: string;
};

export function Accordion({
  title,
  children,
  disabled = false,
  defaultOpen = false,
  className = '',
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Заголовок аккордиона */}
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
          disabled
            ? 'bg-muted/50 cursor-not-allowed opacity-60'
            : 'bg-background hover:bg-muted/30 cursor-pointer'
        }`}
      >
        <h3 className="text-lg font-semibold">{title}</h3>

        {/* Иконка стрелки */}
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } ${disabled ? 'opacity-50' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Контент аккордиона */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border-t border-border bg-background">{children}</div>
      </div>
    </div>
  );
}
