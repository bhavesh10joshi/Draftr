import  jwt  from "jsonwebtoken";
const JWT_SECRET:string = "mynameisbhaveshjoshithisisthedraftrapp";


export function middeware(req:any,res:any,next:any)
{
    const token =  req.headers["authorization"];
    const verification:any = jwt.verify(token , JWT_SECRET);
    
    if(!verification)
    {
        req.UserId = verification._id;
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