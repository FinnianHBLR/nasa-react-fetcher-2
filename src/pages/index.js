import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import { useState, useEffect, useRef } from 'react'
// https://bobbyhadz.com/blog/react-wait-for-state-to-update cool info

import Link from "next/link";

function UserID(){
  // State data
  const [userID, setID] = useState(0);

  const [images, setImages] = useState([]);

  // Blocks first mount
  const isFirstRender = useRef(true);

  // Fetch from URL

  useEffect(() => {
    // Start loading
    fetch('/api/getid')
      .then((res) => res.json())
      // Once data is recieved, set loadign to false and ID to the data.
      .then((data) => {
        setID(data)
        // sessionStorage.setItem("sessionID", data)
      })
  }, [])
  
  useEffect(() => {
    // Whenever session state ID is updated this will happen. 
    // BUT Because mounting will cause an update, this needs to be blocked with the code below:
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    console.log("After key: ", userID);

  // ---------- REQUEST OTHER RESOUCES WITH KEY
  
  
  // FETCH
  fetch(`/api/get-latest-earth-images/?param=${userID.id}`)
  .then((res) => res.json())
  // Once data is recieved, set loadign to false and ID to the data.
  .then((data) => {
    // console.log(JSON.stringify(data));
    console.log(JSON.stringify(data.imageList));
    // images[0].title
    setImages(data.imageList);
  })  
  }, [userID])


  return (
    <div>
      {images.length ? (
        <div>
        <p>Your ID: {userID.id}</p>
        <p>ID Validation: Successful!</p>
        <hr></hr>
        {images.map((data, cardKey) => {
          return (
            <div>
              <h1>{data.title}</h1>
              <h3>{data.url}</h3>
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
