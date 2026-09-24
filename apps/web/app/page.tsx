'use client';
import { useState } from "react";
import Router from "next/router";

export default function Home() {
  const [Slug , setSlug] = useState();

  return<>
    <div>
      <input placeholder="Enter the room name" onChange={(e:any)=>{
        setSlug(e.target.value);
      }}></input>
      <button type="button" onClick={()=>{
        Router.push(`Rooms/${Slug}`)
      }}>Join Room</button>
    </div>
  </>
}
