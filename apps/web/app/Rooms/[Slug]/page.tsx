import ChatRoom from "../../Components/ChatRoom"; 
import { ResolveRoomId } from "../../Functions/function";

export default async function Rooms({params} : {
    params : {
        Slug : string 
    }
})
{
    const Slug = (await params).Slug;
    const RoomId:any = await ResolveRoomId(Slug);

    return <>
        <div>
            <ChatRoom id={RoomId}/>
        </div>       
    </>
}