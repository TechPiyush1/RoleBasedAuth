"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { CustomToken } from "../api/auth/[...nextauth]/options";

const ClientMember = () => {
  const{data:session}=useSession({
    required:true,
    onUnauthenticated(){
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    }
  })
  return (
    <div><h1>Member Client Session</h1>
        <p>{session?.user?.email}</p>
    <p>{(session?.user as CustomToken)?.role}</p></div>
  )
}

export default ClientMember