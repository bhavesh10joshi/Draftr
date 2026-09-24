"use client"

import { useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

async function UserJoinRoom(RoomName:string)
{
    try
    {
        const token = localStorage.getItem("token");
        const payload = {
            RoomName : RoomName
        };   
        const response = await axios.post( `${BACKEND_URL}/app/createRooms` , payload , {
            headers: {
                'authorization': token
            }
        });
        if(!response)
        {
            alert("Problem Encountered !");
            return false;
        }
        return true;
    }
    catch(e)
    {
        alert("Problem Encountered !" + e);
        return false;
    }
}
export default function CreateRoom()
{
    const [RoomName , SetRoomName]:any = useState();
    const Router = useRouter();

    return<>
        <div>
            <input type="text" placeholder="Enter the new name of the Room !" onChange={(e:any) => {
                SetRoomName(e.target.value);
            }}/>
        </div>
        <div>
            <button type="button" onClick={() => {
                const response:any = UserJoinRoom(RoomName);
                if(response)
                {
                    Router.push(`/Rooms/${RoomName}`);
                }
            }}>Create Room</button>
        </div>
    </>
}