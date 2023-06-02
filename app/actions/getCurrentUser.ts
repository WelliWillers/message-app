import getSession from "./getSession"

const getCurrentUser = async () => {
  try {
    const session = await getSession()

    if(!session?.user?.email){
      return null
    }

    // const currentUser 2:45:36
  } catch (error: any) {
    return null
  }
}