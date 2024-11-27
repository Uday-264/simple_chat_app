"use client"
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const LoginModel = () => {

    const handleLogin=()=>{
      signIn("google",{
        callbackUrl:"/dashboard",
        redirect:true
      })
    }
  return (
<Dialog>
  <DialogTrigger asChild>
    <Button>Getting Started</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Welcome to Chitchat</DialogTitle>
      <DialogDescription>
        Chitchat makes it effortless to create secure chat links and start conversations in seconds
      </DialogDescription>
    </DialogHeader>
    <Button variant={'outline'} onClick={handleLogin}>
        <Image src='/images/google.png' alt='Google' className='mr-4' width={25} height={25}/>
        Continue with google
    </Button>
  </DialogContent>
</Dialog>

  )
}

export default LoginModel