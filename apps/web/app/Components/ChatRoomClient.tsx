"use client"

import { useEffect, useState } from "react";
import { useSocket } from "../../Hooks/useSocket"

export default function ChatRoomClient({
    messages = [] ,
    id 
}:{
    messages ?: {messages : string}[] ,
    id : string 
})
{
    const {Loading , Socket}:any  = useSocket();
    const [ChatMessages , SetChatMessages] = useState(messages);
    const[CurrentMessages , SetCurrentMessages]:any = useState();

    useEffect(function()
    {
        if (!Socket || Loading) {
            console.warn("Not Connected Yet: ", Socket);
            return;
        }
        if(Socket && !Loading)
        {   
            // For joining the user to the room 
            Socket.send(JSON.stringify({
                type : "join_room" , 
                roomId : id
            }));
            // Sending the message if the type is message
            Socket.onmessage = function(event:MessageEvent)
            {
                try{
                    const parsedData:any = JSON.parse(event.data);
                    console.log(parsedData);
                    if(parsedData.type?.trim() === "Send_Message")
                    {
                        console.log("Hi");
                        SetChatMessages((c:any) => [
                            ...c,
                            { message: parsedData.message } 
                        ]);
                    }
                }
                catch(e)
                {
                    alert("Error Encountered while parsing ! : " + e);
                    console.log("Error Encountered while parsing ! : " + e);
                }
            }
        }
        return function()
        {
            Socket?.close();
        }
    },[Socket , id , Loading])


    return<>
        <div>
            <input placeholder="Type your message" onChange={(e) => {
                SetCurrentMessages(e.target.value);
            }}></input>
            <button type="button" onClick={()=>{
                if(!Socket)
                {
                    console.warn("Socket not Connected yet");
                }
                console.log("RoomId is : " + id);
                const Message = {
                    type : "Send_Message" ,
                    message : CurrentMessages , 
                    roomId : id 
                };
                Socket.send(JSON.stringify(Message));
                SetCurrentMessages("");
            }}>Send Message</button>
        </div>
        <div>
            { ChatMessages.length != 0
            ? ChatMessages.map((m:any) => 
                <div>{m.message}</div>
            ) : "No messages Found till now"}
        </div>
    </>
}