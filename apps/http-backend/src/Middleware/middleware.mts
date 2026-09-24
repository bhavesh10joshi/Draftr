import  jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";

export function middleware(req:any,res:any,next:any)
{
    const token =  req.headers["authorization"] || req.headers.authorization ;
    console.log(token);
    const verification:any = jwt.verify(token , JWT_SECRET);
    
    if(verification)
    {
        req.UserId = verification.id;
        next();
        return;
    }
    else
    {
        res.status(500).json({
            msg : "Internal Server error !"
        });
        return;
    }
}