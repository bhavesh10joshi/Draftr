"use client"

import { useState } from "react"
import Router, { useRouter } from "next/navigation";

export default function JoinRoom()
{
    const [RoomName , SetRoomName]:any = useState();
    const Router = useRouter();

    return<>
        <div>
            <input type="text" placeholder="Enter the valid name of the room !" onChange={(e:any) => {
                SetRoomName(e.target.value);
            }}/>
        </div>
        <div>
            <button type="button" onClick={() => {
                Router.push(`/Rooms/${RoomName}`);
            }}>Join</button>
        </div>
    </>
}