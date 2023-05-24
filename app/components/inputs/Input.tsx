'use client'

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
}

export default function Input({
  label,
  errors,
  id,
  disabled,
  register,
  required,
  type
}:InputProps){
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={id}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(`
            form-input
            block
            w-full
            border-0
            rounded-md
            py-1.5text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6
          `, 
          errors[id] && "focus:ring-red-500",
          disabled && "opacity-50 cursor-default")}
        />
      </div>
    </div>
  );
}