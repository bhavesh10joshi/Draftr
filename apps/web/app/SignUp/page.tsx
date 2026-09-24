"use client";

import { useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/router";


async function UserSignUp(Email : string , Name : string , Password : string)
{
    try
    {
        const payload = {
            email : Email , 
            name : Name , 
            password :  Password
        };
        const response = await axios.post(`${BACKEND_URL}/signUp` , payload);
        if(!response)
        {
            alert("Problem Encountered : " + response);
            return false;
        }
        alert("Successfully Signed Up !");
        return true;
    }
    catch(e)
    {
        alert("Problem Encountered " + e);
        console.log("Error")
        return false ;
    }
}

export default function SignUp()
{
    const [Email , SetEmail]:any = useState();
    const [Name , SetName]:any = useState();
    const [Password , SetPassword]:any = useState();
    
    return<>
        <div>
            <div>
                <input type="text" placeholder="Enter a valid email" onChange={(e:any) => {
                    SetEmail(e.target.value);
                }}/>
            </div>
            <div>
                <input type="text" placeholder="Enter a Valid name" onChange={(e:any) => {
                    SetName(e.target.value);
                }}/>
            </div>
            <div>
                <input type="text" placeholder="Enter a Valid password" onChange={(e:any) => {
                    SetPassword(e.target.value);
                }}/>
            </div>
            <div>
                <button type="button" onClick={() => {
                    UserSignUp(Email , Name , Password)
                }}>
                    SignUp
                </button>
            </div>
        </div>
    </>
}