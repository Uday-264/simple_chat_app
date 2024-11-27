import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import CreateChat from '@/components/groupChat/createChat';
import {fetchGroups} from '@/fetch/fetchGroups'
import GroupChatCard from '@/components/groupChat/groupChatCard';
 
const Dashboard = async() => {
  const session=await getServerSession(authOptions);
  const groups:Array<GroupChatType> | null=await fetchGroups(session?.user?.token!)
  console.log("groups are:",groups)
  
  return (
    <div>
      <div className="container">
        <div className="mt-6 text-end">
          <CreateChat user={session?.user!} />
        </div>

        {/* If Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard