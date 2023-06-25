"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { api } from "@/app/libs/axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

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

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    buttonRef?.current?.scrollIntoView()

    const messagesHandler = (message: FullMessageType) => {
      api.post(`/conversations/${conversationId}/seen`)

      setMessages((current) => {
        if(find(current, {id: message.id})){
          return current
        }
  
        return [ ...current, message ]
      })
  
      buttonRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };

    pusherClient.bind('messages:new', messagesHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messagesHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
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
