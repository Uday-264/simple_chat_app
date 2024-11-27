import {z} from 'zod'

export const createGroupSchema=z.object({
    title:z.string().min(4,{message:"Title must be 4 characters"}).max(191,{message:"Title must be  less than 191 characters"}),
    passcode:z.string().min(4,{message:"passcode must be 4 characters"}).max(8,{message:"Title must be than 8 characters"}),
}).required();



export type createGroupSchemaType=z.infer<typeof createGroupSchema>