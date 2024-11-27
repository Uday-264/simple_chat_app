import { Router } from "express";
import AuthController from "../controllers/authController.js";
import authMidleware from "../middlewares/authMiddleware.js";
import GroupChatController from "../controllers/GroupChatController.js";
import GroupChatUserController from "../controllers/GroupChatUserController.js";
import ChatsController from "../controllers/chatsController.js";


const  router=Router();

router.post("/auth/login",AuthController.login);

// groupchat

router.get('/group-chat',authMidleware,GroupChatController.getUserGroups);
router.get('/group-chat/:id',GroupChatController.getGroupById);
router.post('/group-chat',authMidleware,GroupChatController.createGroup);
router.put('/group-chat/:id',authMidleware,GroupChatController.update);
router.delete('/group-chat/:id',authMidleware,GroupChatController.delete);


// chatgroup users
router.get("/group-chat-user", GroupChatUserController.getUsers);
router.post("/group-chat-user", GroupChatUserController.store);

//chats 
router.get("/chats/:groupId", ChatsController.index);
export default router;