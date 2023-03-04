import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import { useState, useEffect } from 'react'


function UserID(){
  // State data
  const [userID, setID] = useState(0)
  const [isLoading, setLoading] = useState(false)

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
      })
  }, [])
  
  // Cases in case the data is not there.
  if (isLoading) return <p>Loading...</p>
  if (!userID) return <p>No profile data</p>

  return (
    <p>{userID.id}</p>
  )
}


export default function Home() {
  return (
    <div>
        <p>Hi!</p>
        <div>{UserID()}</div>
    </div>
  )
}
