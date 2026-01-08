import { cn } from '@/shared/lib';

type InputProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  className?: string;
};

export function Input({
  label,
  name,
  value,
  onChange,
  error,
  type,
  className,
  ...props
}: InputProps) {
  console.log(className);
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm text-primary font-medium" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type={type}
        {...props}
        id={name}
        value={value}
        className={cn(
          'bg-primary/20 border border-primary/50 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary',
          error && 'border-warning',
          className
        )}
        onChange={onChange}
      />
      {error && <p className="text-warning text-sm">{error}</p>}
    </div>
  );
}
