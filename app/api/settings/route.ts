import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST (
  req: Request,
){
  try {
    const currentUser = await getCurrentUser()

    const {name, image} = await req.json()

    if(!currentUser?.id){
      return new NextResponse('Não autorizado', {status: 401})
    }

    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        name: name
      }
    })

    return NextResponse.json(updateUser)

  } catch (error:any) {
    console.log(error, "ERROR-SETTINGS");
    return new NextResponse('Internal error', {status: 500})
  }
}