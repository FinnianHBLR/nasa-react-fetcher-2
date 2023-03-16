import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import { useState, useEffect, useRef } from 'react'
// https://bobbyhadz.com/blog/react-wait-for-state-to-update cool info

import Link from "next/link";
import { signal } from "@preact/signals-react";

// Global key access. SessionIDS(ignal)
const sessionIDs = signal(0);

function UserID(){
  // State data
  const [images, setImages] = useState([]);

  // Fetch from URL

  useEffect(() => {
    // Start loading
    fetch('/api/getid')
      .then((res) => res.json())
      // Once data is recieved, set loadign to false and ID to the data.
      .then((data) => {
        // sessionStorage.setItem("sessionID", data)
        sessionIDs.value = data;
      })
  }, [])
  
  useEffect(() => {
    // Check there is a key.
    if (sessionIDs == 0) {
      return;
    }

  console.log("After key signal: ", sessionIDs.value);

  // ---------- REQUEST OTHER RESOUCES WITH KEY
  fetch(`/api/get-latest-earth-images/?param=${sessionIDs.value.id}`)
  .then((res) => res.json())
  // Once data is recieved, set loadign to false and ID to the data.
  .then((data) => {
    //DEBUG: console.log(JSON.stringify(data));
    console.log(JSON.stringify(data.imageList));
    //DEBUG: images[0].title
    setImages(data.imageList);
  });
  }, [sessionIDs.value.id])


  return (
    <div>
      {images.length ? (
        <div>
        <p>Your ID: {sessionIDs.value.id}</p>
        <p>ID Validation: Successful!</p>
        <hr></hr>
        {images.map((data, cardKey) => {
          return (
            <div>
              <h1>{data.title}</h1>
              <Image
               src={data.url}
               width={500}
               height={500}
               />
              <p>{data.url}</p>
            </div>
          )
           } 
        )}
      </div>
      ) : (
        <div>
          <p>Getting ID Please Wait...</p>  
        </div>
      )
    } 
    </div>
  )
}


export default function Home() {
  return (
    <div>
        <p>Kia Ora!</p>
        <div>{UserID()}</div>
    </div>
  )
}
