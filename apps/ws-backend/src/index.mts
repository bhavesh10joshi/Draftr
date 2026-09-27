import {WebSocketServer} from 'ws';
import { TokenValidation } from './TokenValidation/token.mjs';
import { User } from './Interface/index.mjs';
import {prisma} from "@repo/database/db"

const wss = new WebSocketServer({port : 8000} , function()
{
    console.log("Ws is listening on port 8080");
    return;
});

let Users : User[] = [];

wss.on("connection" , function connection(ws,request)
{
    const url = request.url;
    if(!url)
    {
        return;
    }

    const queryparams = new URLSearchParams(url.split('?')[1]);
    const token = queryparams.get('token') ?? "";
    const validation:string | undefined = TokenValidation(token);
    if(!validation)
    {
        ws.close();
        return;
    }

    Users.push({
        UserId : validation , 
        rooms : [] , 
        ws : ws
    });  

    /*
        When Joining a room then message schema -> {
        type : "join_room" , 
        roomId : "abcdef123" -> the room which you want to join
        }
        When leaving a room then message schema -> {
        type : "Leave_Room" ,
        roomId : "abcdef123"
        }
        when sending a message then schema -> {
        type : "Send_Message",
        message : "your message that you want to send" , 
        roomId : "abcdef"
        }
    */


    ws.on('message',async function message(data:string)
    {
        const DataintoJson = JSON.parse(data);
        console.log(DataintoJson);
        if(DataintoJson.type == "join_room")
        {
            // Join room Logic as per above schema
            Users = Users.map((users)=>{
                if(users.UserId == validation)
                {
                    if(!users.rooms.includes(DataintoJson.roomId))
                    {
                        return{
                            ...users , 
                            rooms : [...users.rooms , DataintoJson.roomId]
                        };
                    }
                }
                return users;
            });
        }   
        else if(DataintoJson.type == "Leave_Room")
        {
            Users = Users.map((users)=>{
                if(users.UserId == validation)
                {
                    return{
                        ...users , 
                        rooms : users.rooms.filter((roomId) => roomId != DataintoJson.roomId)
                    }
                }
                return users;
            });
        }
        else if(DataintoJson.type == "Send_Message")
        {
            const message = DataintoJson.message;
            const RoomId = DataintoJson.roomId;
            Users = Users.map((users)=>{
                if(users.rooms.includes(RoomId))
                {
                    users.ws.send(JSON.stringify({
                        type : "Send_Message" , 
                        message : message 
                    }));  
                }
                return users;
            }); 
            await prisma.chat.create({
                data : {
                    roomId : RoomId , 
                    message : message , 
                    userId : validation
                }
            });
            return;
        }

    });

});
