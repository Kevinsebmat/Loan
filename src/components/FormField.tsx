'use client';

import { memo, forwardRef } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  [key: string]: any;
}

const FormField = memo(forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, type = 'text', placeholder, error, required = false, className = '', ...props }, ref) => {
    return (
      <div className={className}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && '*'}
        </label>
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          className={`input-field ${error ? 'border-red-500' : ''}`}
          placeholder={placeholder}
          {...props}
        />
        {error && (
          <p className="error-message">{error}</p>
        )}
      </div>
    );
  }
));

FormField.displayName = 'FormField';

export default FormField; 