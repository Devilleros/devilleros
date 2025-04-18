import { createAuthClient } from "better-auth/react"

const authClient =  createAuthClient()
 
export const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "google"
    })
}

export const signOut = async () => {
    await authClient.signOut(
      // {
      //   fetchOptions: {
      //     onSuccess: () => {
      //       Router.push("/inicio"); // redirect to login page
      //     },
      //   },
      // }
    )
    if (typeof window !== "undefined") {            
      window.location.href = "/";
      //window.location.href = `https://accounts.google.com/Logout?continue=https://appengine.google.com/_ah/logout?continue=${encodeURIComponent("http://localhost:3000/login")}`
      // window.location.href = "/";
  }
}

export const { useSession } = createAuthClient()