import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import Routes from './routes/index.js'
import { Server } from "socket.io";
import { createServer } from "http";
import { socketSetup } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";
const app: Application = express();
const PORT = process.env.PORT || 7000;

const server=createServer(app);
export const io=new Server(server,{
  cors:{
    origin:"*"
  },
  adapter:createAdapter(redis)
});
socketSetup(io);
// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  console.log('received request');
  
  return res.status(210).json({message:"It's working 🙌"});
});

//routes
app.use('/api',Routes)

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
