import {WebSocketServer} from 'ws';
import jwt from "jsonwebtoken"
const JWT_SECRET:string = "mynameisbhaveshjoshithisisthedraftrapp";


const wss = new WebSocketServer({port : 8000});

wss.on("connection" , function connection(ws,request)
{
    const url = request.url;
    if(!url)
    {
        return;
    }

    const queryparams = new URLSearchParams(url.split('?')[1]);
    const token = queryparams.get('token') ?? "";
    const decoded = jwt.verify(token , JWT_SECRET);

    if(!decoded)
    {
        ws.close();
        return;
    }
    ws.on('message',function message(data)
    {
        ws.send('pong');
    });

});
