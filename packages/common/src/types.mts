import {z} from "zod";

export const SignUpSchema = z.object({
    email : z.string().includes('@'),
    password : z.string().min(5).max(10),
    name : z.string().min(5) ,
});

export const SignInSchema = z.object({
    email : z.string().includes('@'),
    password : z.string().min(5).max(10),
});

export const CreateRoomSchema = z.object({
    RoomName : z.string().min(5).max(15)
});