import axios from "axios";
import { BACKEND_URL } from "@/app/config";

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

    // Initial render of existing shapes
    ClearCanvas(ExistingShapes, ctx, Canva);

    if(ws)
    {
        ws.onmessage = function(event : MessageEvent)
        {
            try
            {
                const parsedData:any = JSON.parse(event.data);
                if(parsedData.type?.trim() === "Send_Message")
                {
                    const message = typeof parsedData.message === "string" 
                        ? JSON.parse(parsedData.message) 
                        : parsedData.message;
                    ExistingShapes.push(message);
                    ClearCanvas(ExistingShapes , ctx , Canva);
                }
            }
            catch(e)
            {
                console.log("Error Encountered while parsing ! : " + e);
            }
        }
    }

    let clicked = false; 
    let StartX = 0 , StartY = 0;

    Canva.addEventListener("mousedown" , (e: MouseEvent) => {
        clicked = true;
        const rect = Canva.getBoundingClientRect();
        // Set starting points relative to the canvas
        StartX = e.clientX - rect.left;
        StartY = e.clientY - rect.top;
    });

    Canva.addEventListener("mouseup" , (e: MouseEvent) => {
        if (!clicked) return;
        clicked = false;
        const rect = Canva.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        const width = currentX - StartX;
        const height = currentY - StartY;

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
        ClearCanvas(ExistingShapes, ctx, Canva);
    });

    Canva.addEventListener("mousemove" , function(e: MouseEvent)
    {
        if(clicked)
        {
            const rect = Canva.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            const width = currentX - StartX;
            const height = currentY - StartY;

            ClearCanvas(ExistingShapes , ctx , Canva);
            ctx.strokeStyle = "rgba(255 , 255 , 255)";
            // Use strokeRect with (x, y, width, height)
            ctx.strokeRect(StartX , StartY , width , height);
        }
    });
}

function ClearCanvas(ExistingShapes:ShapeInterface[] , ctx : CanvasRenderingContext2D , Canva : HTMLCanvasElement)
{
    ctx.clearRect(0 , 0 , Canva.width , Canva.height);
    ctx.fillStyle = "rgba(0 , 0 , 0)";
    ctx.fillRect(0 , 0 , Canva.width , Canva.height); // fixed width
    
    ExistingShapes.forEach((shape) => {
        if(shape.type == "rect")
        {
            ctx.strokeStyle = "rgba(255 , 255 , 255)";
            // Use strokeRect with (x, y, width, height)
            ctx.strokeRect(shape.x , shape.y , shape.width , shape.height);
        }
    });
}

async function getShapes(roomId : string)
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