"use client";
import { useRef , useEffect} from "react";
import { initDraw } from "@/draw";

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
            // 1. Get real display dimensions
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 2. Set the internal coordinate buffer to match the screen pixels exactly
            Canva.width = width;
            Canva.height = height;

            // 3. Set the CSS display size explicitly
            Canva.style.width = `${width}px`;
            Canva.style.height = `${height}px`;
            initDraw(Canva , props.RoomId , props.ws);
        }
    },[CanvasRef]);

    if(!props.ws)
    {
        console.log("Hello");
        return<>
            Connecting to the WebSockets ....
        </>
    }
    return<>
        <div className="fixed inset-0 h-screen w-screen overflow-hidden">
            <canvas
                ref={CanvasRef}
                className="block touch-none"
            />
        </div>
    </>
}