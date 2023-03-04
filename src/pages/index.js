import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import { useState, useEffect, useRef } from 'react'
// https://bobbyhadz.com/blog/react-wait-for-state-to-update cool info

function UserID(){
  // State data
  
  const [isLoading, setLoading] = useState(false);
  const [userID, setID] = useState(0);

  const [images, setImages] = useState([]);

  // Blocks first mount
  const isFirstRender = useRef(true);

  // Fetch from URL

  useEffect(() => {
    // Start loading
    setLoading(true)
    fetch('/api/getid')
      .then((res) => res.json())
      // Once data is recieved, set loadign to false and ID to the data.
      .then((data) => {
        setID(data)
        setLoading(false)
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
  fetch('/api/get-latest-earth-images')
  .then((res) => res.json())
  // Once data is recieved, set loadign to false and ID to the data.
  .then((data) => {
    // console.log(JSON.stringify(data));
    console.log(JSON.stringify(data.imageList));

    //setImages({...images, list: data.imageList})
    setImages(data.imageList);
  })
  
  // LOAD
  

  }, [userID])


  // Cases in case the data is not there.

  if (isLoading) return <p>Loading...</p>
  if (!userID) return <p>No profile data</p>
  // VERY IMPORTANT!!! Make sure JSON is loaded before rendering.
  if (!images.length) {return null}
  return (
  <p>{JSON.stringify(images[0].title)}</p>
  
  )
  
  /*
  if (Array.isArray(images)) return (  
    <div>
    {
      images.map((data, key) => {
      return (
        <div key={key.toString()}>
          <p>{data.imageList.toString()}</p>
        </div>
      );
    }
    )
    }
    </div>
  )
    */

}


export default function Home() {
  return (
    <div>
        <p>Hi!</p>
        <div>{UserID()}</div>
    </div>
  )
}
