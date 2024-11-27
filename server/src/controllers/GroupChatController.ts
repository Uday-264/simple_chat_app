import {Request,Response} from 'express'
import prisma from '../utils/db.js';
class GroupChatController {

    static async getUserGroups(req:Request,res:Response){
        try {
            const user=req.user;
            const data=await prisma.groupChat.findMany({
                where:{
                    user_id:user.id
                },
                orderBy:{
                    created_at:"desc"
                }
            });

            return res.status(201).json({
                message:"user groups fetched successfully",
                data
            })
        } catch (error) {
            return res.status(500).json({message:"Somethig went wrong while fetching groups"})
        }
    }
    static async createGroup(req:Request,res:Response){

        try {
            const data=await req.body;
            const user=req.user;
            await prisma.groupChat.create({
                data:{
                    title:data.title,
                    passcode:data.passcode,
                    user_id:user.id,
                }
            });
            return res.status(201).json({message:"Successfully created a group"})

        } catch (error) {
            return res.status(500).json({message:"Somethig went wrong while creating group"})
        }
    }
    static async getGroupById(req:Request,res:Response){
        try {
            const { id } = req.params;
            console.log("id is",id);
            
      if (id) {
        
        const group = await prisma.groupChat.findUnique({
          where: {
            id: id,
          },
        });
        return res.json({ data: group });
      }

      return res.status(404).json({ message: "No groups found" });
        } catch (error) {
            return res.status(500).json({message:"Somethig went wrong while fetching group"})
        }
    }
    static async update(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const body = req.body;
          const data=req.user;
          if (id) {
            await prisma.groupChat.update({
              data: body,
              where: {
                id: id,
                user_id:data.id

              },
            });
            return res.json({ message: "Group updated successfully!" });
          }
    
          return res.status(404).json({ message: "No groups found" });
        } catch (error) {
          return res
            .status(500)
            .json({ message: "Something went wrong.please try again!" });
        }
      }

      static async delete(req: Request, res: Response) {
        try {
          const { id } = req.params;
          const body = req.body;
          if (id) {
            await prisma.groupChat.delete({
              where: {
                id: id,
              },
            });
            return res.json({ message: "Group deleted successfully!" });
          }
    
          return res.status(404).json({ message: "No groups found" });
        } catch (error) {
          return res
            .status(500)
            .json({ message: "Something went wrong.please try again!" });
        }
      }
}

export default GroupChatController;