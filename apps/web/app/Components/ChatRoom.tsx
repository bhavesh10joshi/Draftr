import axios from "axios"
import { BACKEND_URL } from "../config"
import ChatRoomClient from "./ChatRoomClient";

async function getMessages(id:string)
{    
    const response = await axios.get(`${BACKEND_URL}/chats/${id}`);
    if(!response)
    {
        return;
    }
    return response.data.Chats || [];
}
export default async function ChatRoom({id} : {
    id:string
})
{
    const RoomChats:any = (await getMessages(id)) || [];
    return<>
        <div>
            <ChatRoomClient messages={RoomChats} id={id}/>
        </div>
    </>
}