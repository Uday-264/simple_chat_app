"use client"
import React,{useState} from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
// import LogoutModal from './LogoutModel';
const LogoutModal=dynamic(()=>import("@/components/auth/LogoutModel"))
import UserAvatar from '@/components/common/userAvatar'
const ProfileMenu = ({name,image}:{name:string,image?:string}) => {
    const [open,setOpen]=useState(false);
  return (
    <>
    {open && <Suspense fallback={<p>...loading</p>}>
      <LogoutModal open setOpen={setOpen}/>
    </Suspense>}
    <DropdownMenu>
  <DropdownMenuTrigger>
    <UserAvatar name={name} image={image}/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>setOpen(true)}>Logout</DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>
</>
  )
}

export default ProfileMenu