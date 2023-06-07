"use client"

import useConversation from "@/app/hooks/useConversation";
import { api } from "@/app/libs/axios";
import { Image, PaperPlaneRight } from "@phosphor-icons/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

export default function Form() {

  const {conversationId} = useConversation()

  const {register, setValue, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', {shouldValidate: true})
    api.post('/messages', {
      ...data,
      conversationId
    })
  }

  const handleUpload = (data: any) => {
    api.post('/messages', {
      image: data?.info?.secure_url,
      conversationId
    })
  }

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{maxFiles: 1}}
        onUpload={handleUpload}
        uploadPreset="td5ffzk2"
      >
        <Image size={30} className="text-sky-500" />
      </CldUploadButton>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Escreva sua mensagem aqui"
        />
        <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition">
          <PaperPlaneRight size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}
