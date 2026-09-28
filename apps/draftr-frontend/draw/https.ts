import axios from "axios";
import { BACKEND_URL } from "@/app/config";

export async function getShapes(roomId : string)
{
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    if(!response)
    {
        return [];
    }
    if(response.data?.Chats && response.data.Chats.length != 0)
    {
        const shapes = response.data.Chats.map((chats:any) => {
            const raw = chats.message !== undefined ? chats.message : chats;
            return typeof raw === "string" ? JSON.parse(raw) : raw;
        });
        return shapes;
    }
    return [];
}