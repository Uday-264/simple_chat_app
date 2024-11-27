import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import CreateChat from '../groupChat/createChat';
const Dashboard = async() => {
  const session=await getServerSession(authOptions);

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>{session?.user?.name}</h3>

      <div className="">
        {session?.user&& <CreateChat user={session?.user}/>}
      </div>
    </div>
  )
}

export default Dashboard