import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface Iparams {
  conversationId?: string;
}

export async function DELETE(req:Request, {params}: {params: Iparams}){
  try {

    const {conversationId} = params
    const currentUser = await getCurrentUser()
    
    if(!currentUser?.id){
      return new NextResponse('Não autorizado', { status: 401 })
    }

    const existConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    })

    if(!existConversation){
      return new NextResponse('ID inválido', { status: 400 })
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        }
      }
    })

    return NextResponse.json(deletedConversation)

  } catch (error:any) {
    console.log(error, "ERROR_CONVERSATION DELETE");
    return new NextResponse('Internal Error', { status: 500 })
  }
}