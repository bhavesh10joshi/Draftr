"use client";
import { useRef , useEffect} from "react";
import { initDraw } from "@/draw";
import { WS_URL } from "../config";

interface PropsTypes{
    ws : WebSocket | undefined,
    RoomId : string
}; 

export default function Rooms(props:PropsTypes)
{
    const CanvasRef = useRef<HTMLCanvasElement>(null); 

    useEffect(function()
    {
        if(CanvasRef.current)
        {
        const Canva = CanvasRef.current;
        initDraw(Canva , props.RoomId , props.ws);
        }
    },[CanvasRef]);
    
    if(!props.ws)
    {
        return<>
            Connecting to the WebSockets ....
        </>
    }
    return<>
        <canvas ref={CanvasRef} height={1080} width={1080}></canvas>
    </>
}