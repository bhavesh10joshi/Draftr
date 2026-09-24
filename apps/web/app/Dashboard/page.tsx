"use client"
import {useRouter} from "next/navigation"

export default function Dashboard()
{
    const Router = useRouter()
    return<>
    <div>
        <div>
            <button type="button" onClick={()=>{
                Router.push("/JoinRoom");
            }}>Join Existing Room</button>
        </div>
        <div>
            <button type="button" onClick={()=>{
                Router.push("/CreateRoom");
            }}>Create New Room</button>
        </div>
    </div>
    </>  
}