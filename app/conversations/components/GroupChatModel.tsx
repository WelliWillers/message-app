"use client";

import Modal from "@/app/components/Modal";
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
          
        </div>
      </form>
    </Modal>
  );
}
