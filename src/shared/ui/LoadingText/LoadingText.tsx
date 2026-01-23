type LoadingTextProps = {
  text?: string;
  className?: string;
  dotCount?: number;
};

export function LoadingText({ text = 'Загрузка', className = '', dotCount = 3 }: LoadingTextProps) {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <span className="animate-pulse">{text}</span>
      <span className="flex gap-0.5">
        {Array.from({ length: dotCount }).map((_, index) => (
          <span
            key={index}
            className="animate-pulse"
            style={{
              animationDelay: `${index * 200}ms`,
              animationDuration: '1.4s',
            }}
          >
            .
          </span>
        ))}
      </span>
    </div>
  );
}
