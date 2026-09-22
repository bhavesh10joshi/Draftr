import WebSocket from "ws"

export interface User{
    UserId : string , 
    rooms : string[] ,
    ws : WebSocket    
}