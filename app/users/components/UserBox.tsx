'use client'

import Avatar from "@/app/components/Avatar";
import { useLoad } from "@/app/hooks/useLoader";
import { api } from "@/app/libs/axios";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface UserBoxProps {
  data: User
}

export default function UserBox({data}: UserBoxProps) {

    const router = useRouter()
    const {setLoading, show} = useLoad()
    
    const handleClick = useCallback(() => {
        setLoading(true)

        api.post('/conversations', {
            userId: data.id
        }).then((res) => {
            router.push(`/conversations/${res.data.id}`)
        }).finally(() => {
            setLoading(false)
        })
    }, [data, router])

    return (
        <div className="w-full relative flex items-center space-x-3 bg-white hover:bg-neutral-100 p-3 rounded-lg transition cursor-pointer" onClick={handleClick}>
            <Avatar user={data} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900">{data.name}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}