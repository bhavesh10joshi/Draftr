import  Express  from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { middleware } from "./Middleware/middleware.mjs";
import { JWT_SECRET } from "@repo/common-backend/config"
import {SignUpSchema , SignInSchema , CreateRoomSchema} from "@repo/common/types"
import { prisma } from "@repo/database/db"
import {SuccessStatusCodes , ClientErrorStatusCodes , ServerErrors} from "@repo/statuscodes/statuscodes"
import { Request , Response } from "express";
import cors from "cors"

const app = Express();
app.use(Express.json());
app.use(cors());

// Api Endpoint for signing up into the application
app.post("/signUp" , async function(req:Request,res:Response)
{
    const SignUp:any = SignUpSchema.safeParse(req.body);
    
    if(!SignUp)
    {
        res.status(ClientErrorStatusCodes.FailedValidation).json({
            msg : "Incorrect Credentials were provided by the user!"
        })
        return;
    }

    try{
        const hashed = await bcrypt.hash(SignUp.data?.password , 5);
        if(!hashed)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Error Encountered while hashing the password !"
            });
            return ;
        }
        const user =  await prisma.user.create({
            data : {
                email : SignUp.data.email ,
                password : hashed ,
                name : SignUp.data.name 
            }
        });
        if(!user)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred !"  
            });
            return;
        }
        res.status(SuccessStatusCodes.ResourceCreated).json({
            msg : "User is Successfully signed up !"
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Error Encountered while hashing the password !"
        });
        return ;
    }
});
// Api Endpoint for signing in or logging up into the application
app.post("/signIn" , async function(req:Request,res:Response)
{
    const SignIn:any = SignInSchema.safeParse(req.body);
    if(!SignIn)
    {
        res.status(500).json({
            msg : "Incorrect Credentials !"
        });
        return;
    }

    try{
        const findUser = await prisma.user.findUnique({
            where : {
                email : SignIn.data.email  
            }
        });
        if(!findUser)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "The Email Does not exist in the database !"
            });
            return;
        }
        const password = findUser.password;
        const check:any = bcrypt.compare(SignIn.data.password , password);

        if(check)
        {
            const token = jwt.sign({
                id : findUser.id
             } , JWT_SECRET);
            if(token)
            {
                res.status(SuccessStatusCodes.Success).json({
                    token : token 
                });
                return;
            }
            else
            {
                res.status(ServerErrors.InternalServerError).json({
                    msg : "Internal Server Error Occurred !" 
                });
                return;
            }
        }
        else
        {
            res.status(ClientErrorStatusCodes.FailedValidation).json({
                msg : "The given Password is Wrong , Recheck and try again later !"
            });
            return;
        }
    }
    catch(e)
    {
        res.status(ClientErrorStatusCodes.FailedValidation).json({
            msg : "The given Password is Wrong , Recheck and try again later !"
        });
        return;
    }
});
// Api Endpoint for creating rooms and storing them into the db and ws server
app.post("/app/createRooms" , middleware , async function(req:any,res:Response)
{
    const Roomslug:any = CreateRoomSchema.safeParse(req.body);
    const UserId = req.UserId;  

    if(!Roomslug)
    {
        res.status(500).json({
            msg : "Room name given is not suitable !"
        });
        return;
    }

    try
    {
        const MakeRoom = await prisma.room.create({
            data : {
                slug : Roomslug.data.RoomName , 
                adminId : UserId  
            }
        });
        if(!MakeRoom)
        {
            res.status(ServerErrors.InternalServerError).json({
                msg : "Internal Server Error Occurred !"
            });
            return;
        }
        res.status(SuccessStatusCodes.Success).json({
            data :MakeRoom.id
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});
// Api Endpoint for fetching the previous chat messages
app.get("/chats/:roomId" , async function(req:Request , res:Response)
{
    const roomId:any = req.params.roomId;
    
    try{
        const Chats = await prisma.chat.findMany({
            where : {
                roomId : roomId
            },
            orderBy : {
                id : "desc"
            } , 
            take : 1000
        });
        if(!Chats)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "No Chats Available"
            });
            return;
        }
        res.status(SuccessStatusCodes.Success).json({
            Chats : Chats
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return ;
    }
});
// Api endpoint for getting the roomId based on slug
app.get("/room/:slug"  , async function(req,res)
{
    const slug = req.params.slug;
    try{
        const room = await prisma.room.findFirst({
            where:{
                slug : slug
            },
            take : 5
        });
        if(!room)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Room not found !"
            });
            return;
        }
        res.status(SuccessStatusCodes.Success).json({
            room : room 
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal Server Error Occurred !"
        });
        return;
    }
});
// api endpoint for getting details for all the rooms
app.get("/rooms/all" , async  function(req:Request , res:Response)
{   
    try{
        const rooms = await prisma.room.findMany({
            include: {
            admin: true, // Includes the full User object for the admin
            },
        });
        if(!rooms)
        {
            res.status(ClientErrorStatusCodes.ResourceNotFound).json({
                msg : "Rooms not found !"
            });
            return;
        }
        res.status(SuccessStatusCodes.Success).json({
            Rooms : rooms
        });
        return;
    }
    catch(e)
    {
        res.status(ServerErrors.InternalServerError).json({
            msg : "Internal server Error Encountered !"
        });
        return;
    }
});
app.listen(5000 , function()
{
    console.log("Listening at port 5000");
    return;
});