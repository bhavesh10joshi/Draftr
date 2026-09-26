import { useEffect, useRef } from "react"

export default function CanvasFrontend()
{
  const CanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(function()
  {
    if(CanvasRef.current)
    {
      const Canva = CanvasRef.current;
      const ctx = Canva.getContext("2d"); 

      if(!ctx)
      {
        return;
      }

      ctx.fillStyle = "rgba(0 , 0 , 0)";
      ctx.fillRect(0 , 0 , Canva.width , Canva.height);

      let clicked = false; 
      let StartX = 0 , StartY = 0;

      Canva.addEventListener("mousedown" , (e:any) => {
        clicked=true;
        console.log(e.clientX);
        console.log(e.clientY);
      });
      Canva.addEventListener("mouseup" , (e:any) => {
        clicked=false;
        console.log(e.clientX);
        console.log(e.clientY);
      });
      Canva.addEventListener("mousemove" , function(e:any)
      {
        if(clicked)
        {
          const height = e.clientY - StartY;
          const width = e.clientX - StartX;
          ctx.clearRect(0 , 0 , Canva.width , Canva.height);
          ctx.fillStyle = "rgba(0 , 0 , 0)";
          ctx.fillRect(0 , 0 , Canva.height , Canva.height);
          ctx.strokeStyle = "rgba(255 , 255 , 255)";
          ctx.fillRect(StartX , StartY , height , width);
        }
      })
    }
  },[CanvasRef]);
  return<>
    <canvas ref={CanvasRef} height={1080} width={1080}></canvas>
  </>
}