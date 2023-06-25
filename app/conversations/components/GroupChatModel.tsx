"use client";

import Modal from "@/app/components/Modal";
import Button from "@/app/components/inputs/Button";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import { useLoad } from "@/app/hooks/useLoader";
import { api } from "@/app/libs/axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface GroupChatModelProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

export default function GroupChatModel({
  isOpen,
  onClose,
  users
}: GroupChatModelProps) {

  const router = useRouter()
  const {setLoading, show} = useLoad()

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  })

  const members = watch('members')

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true)

    api.post('/conversations', {
      ...data,
      isGroup: true
    }).then(() => {
      router.refresh()
      onClose()
    }).catch(() => {
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
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Criar um novo grupo
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Crie um novo chat com 2 ou mais membros
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Nome do grupo"
                id="name"
                errors={errors}
                required
                disabled={show}
              />
              <Select
                disabled={show}
                label="Membros"
                options={users.map(user => ({
                  value: user.id,
                  label: user.name
                }))}
                onChange={(value) => setValue('members', value, {
                  shouldValidate: true
                })}
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button disabled={show} onClick={onClose} secondary type="button">Cancelar</Button>
          <Button disabled={show} type="submit">Criar</Button>
        </div>
      </form>
    </Modal>
  );
}
