"use client"

import Modal from "@/app/components/Modal";
import Button from "@/app/components/inputs/Button";
import useConversation from "@/app/hooks/useConversation";
import { useLoad } from "@/app/hooks/useLoader";
import { api } from "@/app/libs/axios";
import { Dialog } from "@headlessui/react";
import { Warning } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback } from "react";
import { toast } from "react-hot-toast";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function ConfirmModal({onClose, isOpen}: ConfirmModalProps){

  const router = useRouter()
  const {conversationId} = useConversation()
  const {setLoading, show} = useLoad()

  const onDelete = useCallback(() => {
    setLoading(true)

    api.delete(`/conversations/${conversationId}`)
    .then(() => {
      onClose()
      router.push('/conversations')
      router.refresh()
    })
    .catch(() => {
      toast.error('Algo deu errado!')
    })
    .finally(() => {
      setLoading(false)
    })
  }, [conversationId, router, onClose])
  
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <Warning className="w-6 h-6 text-red-600"/>
            </div>
            <div className="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left">
              <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                Deletar conversa
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Tem certeza que deseja deletar esta conversa? Esta ação não pederá ser revogada</p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-1">
            <Button danger disabled={show} onClick={onDelete}>Deletar</Button>
            <Button secondary disabled={show} onClick={onClose}>Cancelar</Button>
          </div>
        </Modal>
    );
}