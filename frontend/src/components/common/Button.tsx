import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      primary:
        'bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white shadow-soft hover:shadow-medium active:scale-[0.98]',
      secondary:
        'bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-300 text-neutral-700 shadow-soft hover:shadow-medium active:scale-[0.98]',
      ghost:
        'bg-transparent hover:bg-neutral-100 text-neutral-600 hover:text-neutral-800',
      outline:
        'border border-primary-500 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
      danger:
        'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-soft hover:shadow-medium active:scale-[0.98]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    };

    const isDisabled = disabled || loading;

    // Simple className utility
    const classNames = [baseClasses, variants[variant], sizes[size], className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classNames} disabled={isDisabled} {...props}>
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}

        <span className={loading ? 'opacity-70' : ''}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
