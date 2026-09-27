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

interface CanvasWithCleanup extends HTMLCanvasElement {
  _drawCleanupController?: AbortController;
}

export async function initDraw(Canva : CanvasWithCleanup , roomId:string , ws:WebSocket | undefined , shape : string)
{
    const ctx = Canva.getContext("2d"); 
    let ExistingShapes : ShapeInterface[] = await getShapes(roomId);

    if(!ctx)
    {
        return;
    }

    if (Canva._drawCleanupController) {
        Canva._drawCleanupController.abort();
    }

    const controller = new AbortController();
    Canva._drawCleanupController = controller;
    const { signal } = controller;

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
        StartX = e.clientX ;
        StartY = e.clientY ;
    });

    Canva.addEventListener("mouseup" , (e: MouseEvent) => {
        if (!clicked) return;
        clicked = false;

        const width = e.clientX - StartX;
        const height = e.clientY - StartY;

        if(shape == "rect")
        {
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
        }
        else if(shape == "circle"){
            ExistingShapes.push({
                type : "circle" , 
                centerx : StartX , 
                centery : StartY , 
                radius : Math.hypot(width , height) 
            });

            const payload = {
                type : "Send_Message" , 
                message : JSON.stringify({
                    type : "circle" , 
                    centerx : StartX , 
                    centery : StartY , 
                    radius : Math.hypot(width , height) 
                }),
                roomId : roomId
            };
            ws?.send(JSON.stringify(payload));
            ClearCanvas(ExistingShapes, ctx, Canva);
        }
        else if(shape == "line")
        {

        }
        else if(shape == "square")
        {

        }
    });

    Canva.addEventListener("mousemove" , function(e: MouseEvent)
    {
        if(clicked)
        {
            if(shape == "rect")
            {
                const width = e.clientX - StartX;
                const height = e.clientY - StartY;

                ClearCanvas(ExistingShapes , ctx , Canva);
                ctx.beginPath();
                ctx.strokeStyle = "rgba(255 , 255 , 255)";
                ctx.strokeRect(StartX , StartY , width , height);
                ctx.beginPath();
            }
            else if(shape == "circle")
            {
                ClearCanvas(ExistingShapes, ctx, Canva);
                ctx.beginPath();
                ctx.strokeStyle = "rgba(255, 255, 255)"
                const radius = Math.hypot(e.clientX - StartX, e.clientY - StartY);
                ctx.arc(StartX , StartY , radius , 0, 2 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
            }
            else if(shape == "square")
            {

            }
            else
            {

            }
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
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255 , 255 , 255)";
            ctx.strokeRect(shape.x , shape.y , shape.width , shape.height);
            ctx.beginPath();
        }
        else if (shape.type === "circle") {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.arc(shape.centerx, shape.centery, shape.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
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