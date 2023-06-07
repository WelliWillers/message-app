'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  type?: string; 
  required?: boolean;
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  placeholder?: string
}

export default function MessageInput({
  errors,
  id,
  register,
  placeholder,
  required,
  type
}: MessageInputProps) {
  return (
    <div className="relative w-full">
      <input type={type} id={id} autoComplete={id} {...register(id, {required})} placeholder={placeholder} className="text-black font-light py-2 px-4 w-full bg-neutral-100 rounded-full focus: outline-none" />
    </div>
  );
}
