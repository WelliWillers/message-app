"use client";

import { User as PhosphorUser } from "@phosphor-icons/react";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[];
}

export default function AvatarGroup({ users }: AvatarGroupProps) {

  const slicedUsers = users?.slice(0, 3)

  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0',
  }

  return (
    <div className="relative h-11 w-11">
      {slicedUsers?.map((user, i) => (
        <div key={i} className={`
          absolute
          inline-block
          rounded-full
          overflow-hidden
          h-[21px]
          w-[21px]
          ${positionMap[i as keyof typeof positionMap]}
        `}>
          <Image 
            fill
            alt="Avatar image"
            src={user.image || '/images/logo.png'}
          />
        </div>
      ))}
    </div>
  );
}
