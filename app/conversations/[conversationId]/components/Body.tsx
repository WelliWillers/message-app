"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { api } from "@/app/libs/axios";

interface BodyProps {
  initialMessages: FullMessageType[]
}

export default function Body({initialMessages}: BodyProps) {

  const [messages, setMessages] = useState(initialMessages)

  const buttonRef = useRef<HTMLDivElement>(null)

  const {conversationId} = useConversation()

  useEffect(() => {
    api.post(`/conversations/${conversationId}/seen`)
  }, [conversationId])

  return (
    <div className="flex-1 overflow-y-auto">
      {
        messages.map((message, i) => (
          <MessageBox
            key={message.id}
            isLast={i === messages.length - 1}
            data={message}
          />
        ))
      }
      <div className="pt-24" ref={buttonRef} />
    </div>
  );
}
