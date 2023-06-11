'use client'

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { CaretLeft, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  }
}

export default function Header({ conversation }: HeaderProps) {
  
  const otherUser = useOtherUser(conversation)

  const [ openDrawer, setOpenDrawer ] = useState(false)

  const statusText = useMemo(() => {
    if(conversation.isGroup){
      return `${conversation.users.length} membros`
    }
    
    return "Ativo"
  }, [conversation])

  return (
    <>
      <ProfileDrawer 
        data={conversation}
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
      <div className="bg-white w-full flex border-r-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link href="/conversations" className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer">
            <CaretLeft size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div>
              {
                conversation.name || otherUser.name
              }
            </div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <DotsThreeOutlineVertical size={32} onClick={() => setOpenDrawer(true)} className="text-sky-500 cursor-pointer hover:text-sky-600 transition" />
      </div>
    </>
  );
}
