import  jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common-backend/config";

export function TokenValidation(token:string) : string | undefined
{
    try{
        const decoded:any = jwt.verify(token , JWT_SECRET);
        if(!decoded)
        {
            return undefined;
        }
        return decoded.id;
    }
    catch(e)
    {
        return undefined;
    }
}