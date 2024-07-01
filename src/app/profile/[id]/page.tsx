"use client"
import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function ProfilePage({ params }: any) {
  const [data, setData] = useState({
    username:"",
    email:'',
  })
  const getProfile = async () => {
    try {
      const response = await axios.get('/api/users/me')
      console.log(response.data.data)
      setData(response.data.data)
    } catch (error: any) {
      console.log("Failed to get profile", error.message)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getProfile()
  }, [])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl font-bold'>Profile Page</h1>
      <h2>{data.username}</h2>
      <h2>{data.email}</h2>
      <h1 className='bg-green-500 p-2 text-white rounded my-2'>{params.id}</h1>
    </div>
  )
}
