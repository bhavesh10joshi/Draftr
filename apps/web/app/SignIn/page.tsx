"use client";

import { useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";


async function UserSignIn(Email : string , Password : string)
{
    try
    {
        const payload = {
            email : Email , 
            password : Password , 
        };
        const response = await axios.post(`${BACKEND_URL}/signIn` , payload);
        if(!response)
        {
            alert("Problem Encountered : " + response);
            return false;
        }
        localStorage.setItem("token" , response.data.token);
        return true;
    }
    catch(e)
    {
        alert("Problem Encountered " + e);
        return false ;
    }
}

export default function SignIn()
{
    const [Email , SetEmail]:any = useState();
    const [Password , SetPassword]:any = useState();
    const Router = useRouter();

    return<>
        <div>
            <div>
                <input type="text" placeholder="Enter a valid email" onChange={(e:any) => {
                    SetEmail(e.target.value);
                }}/>
            </div>
            <div>
                <input type="text" placeholder="Enter a Valid password" onChange={(e:any) => {
                    SetPassword(e.target.value);
                }}/>
            </div>
            <div>
                <button type="button" onClick={() => {
                    const response:any = UserSignIn(Email , Password);
                    if(response)
                    {
                        Router.push("/Dashboard");
                        return;
                    }
                }}>
                    SignUp
                </button>
            </div>
        </div>
    </>
}