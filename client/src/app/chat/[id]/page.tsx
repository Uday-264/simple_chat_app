import React, { use } from 'react'
import Chatbase from '@/components/chat/chatbase'
import { fetchChatGroupUsers, fetchGroup } from '@/fetch/fetchGroups'
import { notFound } from 'next/navigation';
import { fetchChats } from '@/fetch/fetchChats';
const Chat = async({params}:{params:{id:string}}) => {
  const group:GroupChatType| null =await fetchGroup(params.id);

  if(group===null){
    return notFound();
  };
 
  const users:Array<GroupChatUserType>|[]=await fetchChatGroupUsers(params.id)
  const chats: Array<MessageType> | [] = await fetchChats(params.id);
  return (
    <div>
        
        <Chatbase group={group} users={users} oldMessages={chats}/>
    </div>

  )
}

export default Chat