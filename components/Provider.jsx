'use client'
import { SessionProvider } from "next-auth/react"

const Prodiver = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Prodiver
