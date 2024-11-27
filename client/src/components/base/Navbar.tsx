"use client";
import React from "react";
import Link from "next/link";
import LoginModal from "@/components/auth/LoginModel";
import ProfileMenu from "../auth/ProfileMenu";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const {data}=useSession()
  // console.log(data)
  const user=data?.user
  return (
    <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
      <h1 className="text-xl md:text-2xl font-extrabold">QuickChat</h1>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        <Link href="/">Home</Link>
        <Link href="#features">Features</Link>
    
        {!user ? (
          <LoginModal />
        ) : (
          <ProfileMenu name={user?.name} image={user?.image}/>
        )}
      </div>
    </nav>
  );
}