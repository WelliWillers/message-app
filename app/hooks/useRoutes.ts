import { ChatsCircle, SignOut, Users } from '@phosphor-icons/react'
import { signOut } from "next-auth/react";
import { usePathname } from 'next/navigation';
import useConversation from './useConversation';
import { useMemo } from 'react';

const useRoutes = () => {
  const pathName = usePathname()

  const {conversationId} = useConversation()
  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: ChatsCircle,
      active: pathName === '/conversations' || !!conversationId
    },
    {
      label: 'Users',
      href: '/users',
      icon: Users,
      active: pathName === '/users'
    },
    {
      label: 'Logout',
      href: '#',
      onClick: () => signOut(),
      icon: SignOut
    }
  ], [pathName, conversationId])

  return routes
}

export default useRoutes