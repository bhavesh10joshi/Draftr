"use client";
import { WS_URL } from "../config";
import Rooms from "../Rooms/page";
import { useEffect , useState } from "react";

interface PropsTypes{
    RoomId : string
}; 

export default function Playground(props:PropsTypes)
{
    const [Ws , SetWs] = useState<WebSocket | undefined>();
    useEffect(function()
    {
        const ws = new WebSocket(`${WS_URL}?token=`);
        SetWs(ws);
        ws.send(JSON.stringify({
            type : "join_room" , 
            roomId : props.RoomId
        }));
    },[]);

    return<>
        <div>
            <Rooms RoomId={props.RoomId} ws={Ws}/>
        </div>
    </>
}