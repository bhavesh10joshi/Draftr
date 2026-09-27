"use client";
import { WS_URL } from "../config";
import Rooms from "../Rooms/page";
import { useEffect, useState } from "react";

interface PropsTypes {
  RoomId: string;
}

export default function Playground(props: PropsTypes) {
  const [ws, setWs] = useState<WebSocket | undefined>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = new WebSocket(`${WS_URL}?token=${token}`);

    socket.onopen = () => {
      console.log("WebSocket connected, sending join_room payload");
      setWs(socket);

      // Send join event directly on the connected socket instance
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: props.RoomId,
        })
      );
    };

    socket.onerror = (err) => {
      console.error("WebSocket connection error:", err);
    };

    // Cleanup on unmount / room change
    return () => {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
    };
  }, [props.RoomId]);

  if (!ws) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-sm text-muted-foreground">
        Connecting to room...
      </div>
    );
  }

  return (
    <div>
      <Rooms RoomId={props.RoomId} ws={ws} />
    </div>
  );
}