import Env from "./env";

export const BASE_URL = Env.BACKEND_URL;
export const API_URL = BASE_URL + "/api";
export const LOGIN_URL = API_URL + "/auth/login";
export const GROUP_CHAT = API_URL + "/group-chat";
export const CHAT_GROUP_USERS = API_URL + "/group-chat-user";
export const CHATS_URL = API_URL + "/chats";