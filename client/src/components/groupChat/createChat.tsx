"use client"
import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

import { createGroupSchema ,type createGroupSchemaType}  from '@/validations/groupChatValidation';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';
import { GROUP_CHAT } from '@/lib/apiEndpoints';
import axios, { AxiosError } from 'axios';
import { CustomUser } from '@/app/api/auth/[...nextauth]/options';
import { useRouter } from 'next/navigation';
import { clearCache } from '@/actions/common';
const CreateChat = ({user}:{user:CustomUser}) => {
    const [open,setOpen]=useState(false);
    const {register,handleSubmit,formState:{errors}}=useForm<createGroupSchemaType>({resolver:zodResolver(createGroupSchema)})
    const [loading,setLoading]=useState(false);
    const {toast}=useToast();
    const router=useRouter()
    const onSubmit=async(data:createGroupSchemaType)=>{
        console.log("create group data",data)
        try {
            setLoading(true);
            clearCache('dashboard')
            const res=await axios.post(GROUP_CHAT,{...data,user_id:user.id},{
                headers:{
                    Authorization:user.token
                }
            });
            console.log(res)
            if(res?.data?.message){
                setLoading(false);
                setOpen(false);
                toast({variant:'default',title:"Success",description:res.data.message});
                router.refresh()
            }
        } catch (error) {
            setLoading(false);
            if(error instanceof AxiosError){
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: error.message,
                })
            }
            else{
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: ""
                })
            }
        }

    }

    return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
      <Button>create group</Button>  
  </DialogTrigger>
  <DialogContent onInteractOutside={(e)=>e.preventDefault()}>
    <DialogHeader>
      <DialogTitle>Create your new chat</DialogTitle>
    </DialogHeader>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passcode")} />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Creating.." : "create"}
            </Button>
          </div>
    </form>
  </DialogContent>
</Dialog>

  )
}

export default CreateChat