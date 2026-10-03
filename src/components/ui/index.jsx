import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, forwardRef } from 'react';

export const cx = (...c) => c.filter(Boolean).join(' ');

export function Button({ variant = 'primary', size = 'md', className, as: Tag = 'button', children, ...rest }) {
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary-hover',
    secondary: 'bg-white text-brand-primary border border-brand-primary hover:bg-brand-primary/5',
    ghost: 'text-neutral-700 hover:bg-neutral-100',
    danger: 'bg-brand-danger text-white hover:opacity-90',
    light: 'bg-white text-brand-primary hover:bg-white/90',
  };
  const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-11 px-4 text-sm', lg: 'h-12 px-6 text-base' };
  return (
    <Tag className={cx('inline-flex items-center justify-center gap-2 rounded-btn font-medium transition disabled:opacity-50 disabled:cursor-not-allowed', variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Tag>
  );
}

export function Card({ className, hover, children, ...rest }) {
  return <div className={cx('card', hover && 'transition hover:shadow-md hover:-translate-y-0.5', className)} {...rest}>{children}</div>;
}

export function Badge({ color = '#1E5EFF', children, className }) {
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium', className)} style={{ backgroundColor: color + '1A', color }}>
      {children}
    </span>
  );
}

export function Chip({ active, onClick, children, className }) {
  return (
    <button type="button" onClick={onClick}
      className={cx('inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition',
        active ? 'border-brand-primary bg-brand-primary text-white' : 'border-border bg-white text-neutral-700 hover:border-brand-primary hover:text-brand-primary',
        className)}>
      {children}
    </button>
  );
}

export const Input = forwardRef(function Input({ className, ...rest }, ref) {
  return <input ref={ref} className={cx('h-11 w-full rounded-btn border border-border bg-white px-3 text-sm placeholder:text-neutral-400 focus:border-brand-primary', className)} {...rest} />;
});

export const Textarea = forwardRef(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} className={cx('w-full rounded-btn border border-border bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-brand-primary', className)} {...rest} />;
});

export const Select = forwardRef(function Select({ className, children, ...rest }, ref) {
  return <select ref={ref} className={cx('h-11 w-full rounded-btn border border-border bg-white px-3 text-sm focus:border-brand-primary', className)} {...rest}>{children}</select>;
});

export function Modal({ open, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-900/50 p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            className={cx('w-full bg-white shadow-lg sm:rounded-modal rounded-t-modal', sizes[size])}>
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
              <button aria-label="Zamknij" onClick={onClose} className="rounded-full p-2 hover:bg-neutral-100"><X size={18} /></button>
            </div>
            <div className="px-5 py-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toast({ message }) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="pointer-events-auto rounded-btn bg-neutral-900 px-4 py-3 text-sm text-white shadow-lg">
      {message}
    </motion.div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-border p-10 text-center">
      {Icon && <div className="mb-3 rounded-full bg-neutral-100 p-3 text-neutral-400"><Icon size={22} /></div>}
      <p className="font-semibold text-neutral-900">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-neutral-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={cx('animate-pulse rounded-btn bg-neutral-100', className)} />;
}