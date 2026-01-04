import clsx from 'clsx'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  loading?: boolean
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  }

const variantClasses = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed',
  link: 'text-primary underline-offset-4 hover:underline font-semibold p-0 m-0',
  danger:
    'bg-destructive text-destructive-foreground hover:bg-destructive/80 disabled:opacity-50 disabled:cursor-not-allowed',
}

const sizeClasses = {
  sm: 'px-1 py-1 text-sm rounded-md',
  md: 'px-2 py-1 text-base rounded-md',
  lg: 'px-3 py-2 text-lg rounded-md',
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  size = 'md',
  disabled = false,
  className = '',
  loading = false,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      {...props}
      className={clsx(
        'cursor-pointer w-fit h-fit font-semibold',
        loading && 'opacity-50 cursor-not-allowed',
        variant !== 'link' && sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      type="button"
      disabled={isDisabled}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
