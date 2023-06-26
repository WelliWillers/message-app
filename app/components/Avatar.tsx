"use client";

import { User as PhosphorUser } from "@phosphor-icons/react";
import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user?: User;
}

export default function Avatar({ user }: AvatarProps) {

  const {members} = useActiveList()

  const isActive = members.indexOf(user?.email!) != -1

  return (
    <div className="relative">
      <div className="bg-gray-100 relative rounded-full h-9 w-9 overflow-hidden md:h-11 md:w-11 flex items-center justify-center">
        {!user?.image ? (
          <PhosphorUser />
        ) : (
          <Image alt={"avatar"} src={user?.image!} fill />
        )}
      </div>
      {
        isActive && (
          <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
        )
      }
    </div>
  );
}
