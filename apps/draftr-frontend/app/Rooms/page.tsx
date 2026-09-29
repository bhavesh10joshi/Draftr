"use client";
import { useRef, useEffect, useState } from "react";
import { Game } from "@/draw/game";
import { useRouter } from "next/navigation";
import { MessageSquare, X, Send, Copy, Check, LogOut, Square, Circle, Minus, Type } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface PropsTypes {
  ws: WebSocket | undefined;
  RoomId: string;
  roomName?: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
}


export default function Rooms(props: PropsTypes) {
  const [selectedShape, setSelectedShape] = useState("circle");
  const CanvasRef = useRef<HTMLCanvasElement>(null);
  const [CurrentGameClass, SetCurrentGameClass] = useState<Game>();
  const router = useRouter();

  // Sidebar & Chat states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    CurrentGameClass?.setTool(selectedShape);
  }, [selectedShape, CurrentGameClass]);

  // Handle Canvas Initialization
  useEffect(() => {
    if (CanvasRef.current) {
      const Canva = CanvasRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      Canva.width = width;
      Canva.height = height;

      Canva.style.width = `${width}px`;
      Canva.style.height = `${height}px`;

      const game = new Game(Canva, props.RoomId, props.ws);
      game.init();

      SetCurrentGameClass(game);

      return function () {
        game.destroy();
      };
    }
  }, [props.RoomId, props.ws]);

  // Listen to WebSocket messages for Chat
  useEffect(() => {
    if (!props.ws) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat") {
          setMessages((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substr(2, 9),
              sender: data.sender || "User",
              text: data.message,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        }
      } catch (err) {
        console.error("Error parsing WS message:", err);
      }
    };

    props.ws.addEventListener("message", handleMessage);
    return () => {
      props.ws?.removeEventListener("message", handleMessage);
    };
  }, [props.ws]);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (isSidebarOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSidebarOpen]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !props.ws) return;

    const payload = {
      type: "chat",
      roomId: props.RoomId,
      message: inputMessage.trim(),
    };

    props.ws.send(JSON.stringify(payload));

    // Optimistically update local UI
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        sender: "You",
        text: inputMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    setInputMessage("");
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(props.RoomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeaveRoom = () => {
    props.ws?.close();
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Canvas */}
      <canvas ref={CanvasRef} className="block touch-none" />

      {/* Floating Toolbar (Center Bottom) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1.5 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-xl shadow-2xl">
        <button
          onClick={() => setSelectedShape("rect")}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition ${
            selectedShape === "rect" ? "bg-zinc-700 text-white font-medium" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          <Square className="w-4 h-4" />
          <span>Rectangle</span>
        </button>
        <button
          onClick={() => setSelectedShape("circle")}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition ${
            selectedShape === "circle" ? "bg-zinc-700 text-white font-medium" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          <Circle className="w-4 h-4" />
          <span>Circle</span>
        </button>
        <button
          onClick={() => setSelectedShape("line")}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition ${
            selectedShape === "line" ? "bg-zinc-700 text-white font-medium" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          <Minus className="w-4 h-4" />
          <span>Line</span>
        </button>
        <button
          onClick={() => setSelectedShape("text")}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition ${
            selectedShape === "text" ? "bg-zinc-700 text-white font-medium" : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
        >
          <Type className="w-4 h-4" />
          <span>Text</span>
        </button>
      </div>

      {/* Sidebar Toggle Button (Top Right) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3.5 py-2.5 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-zinc-200 rounded-xl shadow-lg hover:bg-zinc-800 transition"
      >
        <MessageSquare className="w-5 h-5 text-indigo-400" />
        <span className="text-sm font-medium">Chat & Info</span>
        {messages.length > 0 && (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
        )}
      </button>

      {/* Right Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-zinc-900/95 backdrop-blur-lg border-l border-zinc-800 shadow-2xl z-30 flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-100">{props.roomName || "Canvas Room"}</h2>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400">
              <span className="truncate max-w-[180px]">ID: {props.RoomId}</span>
              <button onClick={copyRoomId} className="hover:text-zinc-200 transition">
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 gap-2">
              <MessageSquare className="w-8 h-8 stroke-1" />
              <p className="text-sm">No messages yet. Say hello!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.sender === "You";
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-xs font-medium text-zinc-400">{msg.sender}</span>
                    <span className="text-[10px] text-zinc-600">{msg.time}</span>
                  </div>
                  <div
                    className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm break-words ${
                      isMe ? "bg-indigo-600 text-white rounded-tr-xs" : "bg-zinc-800 text-zinc-200 rounded-tl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Message Input Footer */}
        <div className="p-3 border-t border-zinc-800 flex flex-col gap-2 bg-zinc-900">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white rounded-xl transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleLeaveRoom}
            className="w-full mt-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-xl border border-red-500/20 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Leave Room</span>
          </button>
        </div>
      </div>
    </div>
  );
}