"use client";
import { useRef, useEffect , useState} from "react";
import { initDraw } from "@/draw";


interface PropsTypes {
  ws: WebSocket | undefined;
  RoomId: string;
}

export default function Rooms(props: PropsTypes) {

    const [selectedShape , setSelectedShape] = useState("");
    const CanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (CanvasRef.current) {
        const Canva = CanvasRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        Canva.width = width;
        Canva.height = height;

        Canva.style.width = `${width}px`;
        Canva.style.height = `${height}px`;
        initDraw(Canva, props.RoomId, props.ws , selectedShape);
        }
    }, [CanvasRef , selectedShape]);

    if (!props.ws) {
        return <>Connecting to the WebSockets ....</>;
    }

    return (
        <div className="fixed inset-0 h-screen w-screen overflow-hidden">
        <canvas ref={CanvasRef} className="block touch-none" />

        <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <button
            onClick={() => setSelectedShape("rect")}
            className="px-3 py-2 bg-zinc-800 text-white text-sm rounded-lg shadow-md hover:bg-zinc-700 transition"
            >
                Rectangle
            </button>
            <button
            onClick={() => setSelectedShape("square")}
            className="px-3 py-2 bg-zinc-800 text-white text-sm rounded-lg shadow-md hover:bg-zinc-700 transition"
            >
                Square
            </button>
            <button
            onClick={() => setSelectedShape("circle")}
            className="px-3 py-2 bg-zinc-800 text-white text-sm rounded-lg shadow-md hover:bg-zinc-700 transition"
            >
                Circle
            </button>
            <button
            onClick={() => setSelectedShape("line")}
            className="px-3 py-2 bg-zinc-800 text-white text-sm rounded-lg shadow-md hover:bg-zinc-700 transition"
            >
                Line
            </button>
        </div>
        </div>
    );
}