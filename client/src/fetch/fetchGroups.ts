import {CHAT_GROUP_USERS, GROUP_CHAT} from '@/lib/apiEndpoints';

export async function fetchGroups(token:string){
    const res= await fetch(GROUP_CHAT,{
        headers:{
            Authorization:token
        },
        next:{
            revalidate:60*60,
            tags:["dashboard"]
        }
    });
    if(!res.ok){
        throw new Error("failed to fetch groups")
    }
    const response=await res.json();
    if(response?.data){
        return response.data
    };
    return [];
}

export async function fetchGroup(id:string){
    const res= await fetch(`${GROUP_CHAT}/${id}`,{
        cache:"no-cache"
    });
    if(!res.ok){
        throw new Error("failed to fetch groups")
    }
    const response=await res.json();
    if(response?.data){
        return response.data
    };
    return null;
}
export async function fetchChatGroupUsers(id: string) {
    const res = await fetch(`${CHAT_GROUP_USERS}?group_id=${id}`, {
      cache: "no-cache",
    });
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    const response = await res.json();
    if (response?.data) {
      return response?.data;
    }
    return [];
  }
