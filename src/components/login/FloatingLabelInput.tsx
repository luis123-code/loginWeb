import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
  rightAction?: ReactNode;
}

export const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, icon, error, rightAction, id, className, ...props }, ref) => {
    const inputId = id ?? `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
    return (
      <div className="space-y-1.5">
        <div className={`float-field ${error ? "has-error animate-shake" : ""}`}>
          <input
            ref={ref}
            id={inputId}
            placeholder={label}
            className={`${rightAction ? "!pr-12" : ""} ${className ?? ""}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          <label htmlFor={inputId}>{label}</label>
          {icon && <span className="field-icon">{icon}</span>}
          {rightAction && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightAction}</div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="px-1 text-xs font-medium text-destructive animate-fade-in"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
FloatingLabelInput.displayName = "FloatingLabelInput";
