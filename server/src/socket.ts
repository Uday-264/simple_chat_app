
import { Server,Socket } from "socket.io";
import prisma from "./utils/db.js";

interface CustomSocket extends Socket{
    room?:string
}

export function socketSetup(io:Server){
    io.use((socket:CustomSocket,next)=>{
        const room=socket.handshake.auth.room || socket.handshake.headers.room;
        if(!room){
            return next(new Error("invalid room"))
        };
        socket.room=room;
        next();
    });
    io.on("connection",(socket:CustomSocket)=>{
        console.log("Socket connected",socket.id);
        console.log("socket room",socket.room);
        
        socket.join(socket.room)
        socket.on("message",async(data)=>{
            // console.log("server side data:",data);
            await prisma.chats.create({
                data:data
            })
            // socket.broadcast.emit("message",data)
            socket.to(socket.room).emit("message",data)
        })
        socket.on("disconnect",()=>{
            console.log("A user disconnected",socket.id);
        });
    });
}