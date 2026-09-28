"use client";
import { useRef, useEffect , useState} from "react";
import { Game } from "@/draw/game";
import { useRouter } from "next/navigation";

interface PropsTypes {
  ws: WebSocket | undefined;
  RoomId: string;
}

export default function Rooms(props: PropsTypes) {

    const [selectedShape , setSelectedShape] = useState("circle");
    const CanvasRef = useRef<HTMLCanvasElement>(null);
    const[CurrentGameClass , SetCurrentGameClass] = useState<Game>();
    const router = useRouter(); 

    useEffect(() => {
        CurrentGameClass?.setTool(selectedShape);
    }, [selectedShape, CurrentGameClass]);

    useEffect(() => {
        if (CanvasRef.current) {
            const Canva = CanvasRef.current;
            const width = window.innerWidth;
            const height = window.innerHeight;

            Canva.width = width;
            Canva.height = height;

            Canva.style.width = `${width}px`;
            Canva.style.height = `${height}px`;
           
            const game = new Game(Canva , props.RoomId , props.ws);
            
            game.init();

            SetCurrentGameClass(game);
            
            return function()
            {
                game.destroy();
            }
        }
    }, [CanvasRef]);


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
            onClick={() => setSelectedShape("text")}
            className="px-3 py-2 bg-zinc-800 text-white text-sm rounded-lg shadow-md hover:bg-zinc-700 transition"
            >
                Text
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
            <button
            onClick={() => {
                props.ws?.close();
                router.push("/dashboard");
                return;
            }}
            className="px-3 py-2 bg-zinc-800 text-white text-sm rounded-lg shadow-md hover:bg-zinc-700 transition"
            >
                Leave Room
            </button>
        </div>
        </div>
    );
}