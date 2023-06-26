"use client"

import { useLoad } from "@/app/hooks/useLoader";
import { api } from "@/app/libs/axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../inputs/Button";
import Avatar from "../Avatar";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

export default function SettingsModal({
  currentUser,
  isOpen,
  onClose,
}: SettingsModalProps) {

  const router = useRouter()
  const {setLoading, show} = useLoad()

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image
    }
  })

  const image = watch('image')

  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, {
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true)

    api.post('settings', data)
    .then(() => {
      router.refresh()
      onClose()
    })
    .catch(() => {
      toast.error('Algo deu errado')
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-gray-900 leading-7">
              Perfil
            </h2>
            <p className="mt-1 text-sm text-gray-600 leading-6">
              Edite suas informações públicas.
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input disabled={show} label="Nome" id="name" errors={errors} register={register} required/>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Foto</label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Avatar user={currentUser} />
                  <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset="td5ffzk2">
                    <Button disabled={show} secondary type="button">
                      Editar
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button secondary disabled={show} onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={show}>Salvar</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
