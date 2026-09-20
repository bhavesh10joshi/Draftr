import  Express  from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { middeware } from "./Middleware/middle.mjs";

const app = Express();
app.use(Express.json());
const JWT_SECRET:string = "mynameisbhaveshjoshithisisthedraftrapp";

app.post("/signUp" , async function(req,res)
{
    const username = req.body.username;
    const password = req.body.password;

    // Hashing the password using bcrypt 
    const hashed = await bcrypt.hash(password , 5);
    //pushing the username and the hashed password into the database
    
    res.json({
        msg : "Successfully Signed up !" 
    });
    return ;
});

app.post("/signIn" , async function(req,res)
{
    const username = req.body.username;
    // check whether the username exists in the database

    // if username is found then check for the password
    const password = req.body.password;

    // checking the password with the db one using bcrypt
    const dbgotpassword:string="";

    const check:any = bcrypt.compare(password , dbgotpassword);

    if(!check)
    {
        res.json({
            msg : "Incorrect password !"
        });
        return;
    }
    // Now generating the token using jwt with the _id of the particular document in the database.
    const _id : string = ""; 
    const generate:any = jwt.sign(_id , JWT_SECRET);
    
    res.json({
        token : generate
    });
    return;

});

app.post("/app/createrooms" , middeware , function(req,res)
{

})


app.listen(5000);