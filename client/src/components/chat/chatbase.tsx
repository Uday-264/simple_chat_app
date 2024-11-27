"use client"
import { getSocket } from "@/lib/socket.config"
import { useEffect, useMemo, useState } from "react"
import {v4 as uuidV4} from 'uuid'
import { Button } from "../ui/button";
import ChatSidebar from "./chatSidebar";
import ChatNav from "./chatNAv";
import ChatUserDialog from "./chatUserDialog";
import Chats from "./chats";
const Chatbase = ({group,users,oldMessages}:
    {
        group:GroupChatType,
        users:Array<GroupChatUserType> | [],
        oldMessages: Array<MessageType> | [];
    }) => {
    const [open,setOpen]=useState(true);
    const [chatUser, setChatUser] = useState<GroupChatUserType>();
    useEffect(() => {
      const data = localStorage.getItem(group.id);
      if (data) {
        const pData = JSON.parse(data);
        setChatUser(pData);
      }
    }, [group.id]);
    return (
        <div className="flex">
            <ChatSidebar users={users}/>
            <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
            {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} user={chatUser} />
        )}

          <Chats oldMessages={oldMessages} group={group} chatUser={chatUser} />
            </div>
             {/* Messages */}
        </div>
  )
}

export default Chatbase