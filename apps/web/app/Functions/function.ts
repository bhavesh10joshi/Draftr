import { BACKEND_URL } from "../config";
import axios from "axios";

export async function ResolveRoomId(Slug:string)
{
    const response = await axios.get(`${BACKEND_URL}/room/${Slug}`);
    if(!response)
    {
        return;
    }
    return response.data.room.id;
}