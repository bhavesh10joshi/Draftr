import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { RocknRoll_One } from "next/font/google";

type ShapeInterface = {
    type : "rect" , 
    x : number , 
    y : number , 
    height : number , 
    width : number
} | {
    type : "circle" , 
    centerx : number , 
    centery : number , 
    radius : number 
};

export async function initDraw(Canva : HTMLCanvasElement , roomId:string , ws:WebSocket | undefined)
{
    const ctx = Canva.getContext("2d"); 
    let ExistingShapes : ShapeInterface[] = await getShapes(roomId);

    if(!ctx)
    {
        return;
    }

    if(ws)
    {
        ws.onmessage = function(event : MessageEvent)
        {
            try
            {
                const parsedData:any = JSON.parse(event.data);
                if(parsedData.type?.trim() === "Send_Message")
                {
                    ExistingShapes.push(parsedData.message);
                    ClearCanvas(ExistingShapes , ctx , Canva);
                }
            }
            catch(e)
            {
                alert("Error Encountered while parsing ! : " + e);
                console.log("Error Encountered while parsing ! : " + e);
            }
        }
    }

    ctx.fillStyle = "rgba(0 , 0 , 0)";
    ctx.fillRect(0 , 0 , Canva.width , Canva.height);

    let clicked = false; 
    let StartX = 0 , StartY = 0;

    Canva.addEventListener("mousedown" , (e:any) => {
        clicked=true;
    });

    Canva.addEventListener("mouseup" , (e:any) => {
        clicked=false;
        const height = e.clientY - StartY;
        const width = e.clientX - StartX;
        ExistingShapes.push({
            type : "rect" , 
            x : StartX , 
            y : StartY , 
            height : height , 
            width : width
        });
        const payload = {
            type : "Send_Message" , 
            message : JSON.stringify({
                type : "rect" , 
                x : StartX , 
                y : StartY , 
                height : height , 
                width : width
            }),
            roomId : roomId
        };
        ws?.send(JSON.stringify(payload));
    });

    Canva.addEventListener("mousemove" , function(e:any)
    {
        if(clicked)
        {
            const height = e.clientY - StartY;
            const width = e.clientX - StartX;
            ClearCanvas(ExistingShapes , ctx , Canva);
            ctx.strokeStyle = "rgba(255 , 255 , 255)";
            ctx.fillRect(StartX , StartY , height , width);
        }
    });
}
function ClearCanvas(ExistingShapes:ShapeInterface[] , ctx : CanvasRenderingContext2D , Canva : HTMLCanvasElement)
{
    ctx.clearRect(0 , 0 , Canva.width , Canva.height);
    ctx.fillStyle = "rgba(0 , 0 , 0)";
    ctx.fillRect(0 , 0 , Canva.height , Canva.height);
    ExistingShapes.map((shape) => {
        if(shape.type == "rect")
        {
            ctx.strokeStyle = "rgba(255 , 255 , 255)";
            ctx.fillRect(shape.x , shape.y , shape.height , shape.width);
        }
    });
}
async function getShapes(roomId : string)
{
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    if(!response)
    {
        return;
    }
    if(response.data.chats.length != 0)
    {
        const shapes = response.data.chats.map((chats:any) => {
            return JSON.parse(chats);
        });
        return shapes;
    }
    return [];
}