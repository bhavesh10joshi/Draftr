import axios from "axios";
import Playground from "@/app/Playground/page";
import { BACKEND_URL } from "@/app/config";

async function FindRoomId(slug : string)
{
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    if(!response)
    {
        return null;
    }  
    return response.data.room.id;
}

export default async function Canvas({params} : {
    params : {
        slug : string
    }
})
{
  const slug = (await params).slug
  const roomId = await FindRoomId(slug);
  return<>
    <div>
        <Playground RoomId={roomId}/>
    </div>
  </>
}