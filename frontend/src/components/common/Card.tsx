import { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hover = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'rounded-2xl transition-all duration-200';

    const variants = {
      default: 'bg-white shadow-soft border border-neutral-100/50',
      glass: 'bg-white/70 backdrop-blur-sm shadow-glass border border-white/20',
      elevated: 'bg-white shadow-large',
      bordered: 'bg-white border-2 border-neutral-200',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    };

    const hoverClasses = hover
      ? 'hover:shadow-medium hover:-translate-y-0.5 cursor-pointer'
      : '';

    // Simple className utility
    const classNames = [
      baseClasses,
      variants[variant],
      paddings[padding],
      hoverClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
