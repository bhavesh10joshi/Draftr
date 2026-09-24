'use client';
import { WS_URL } from "../app/config";
import { useEffect, useState } from "react";

export function useSocket()
{
    const [Loading , SetLoading] = useState<boolean>(true);
    const [Socket , SetSocket] = useState<WebSocket>(); 

    useEffect(function()
    {
        const token = localStorage.getItem("token");  
        const ws = new WebSocket(`${WS_URL}?token=${token}`);
        ws.onopen = () =>
        {
            SetLoading(false);
            SetSocket(ws);
        }
        // The above function means first connect to the websocket instance and then execute the function and its content
    },[]);

    return{
        Loading ,
        Socket 
    };
}