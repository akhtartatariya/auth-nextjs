"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from "react-hot-toast"
export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const getUserData = async () => {
        try {
            const response = await axios.get('/api/users/me')
            setData(response.data.data._id)
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-2xl font-bold'>Profile Page</h1>
            <hr />
            <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>Click Here To View Profile</Link>}</h2>
            <hr />
            <button onClick={logout} className='text-white bg-blue-500 hover:bg-blue-700 rounded-lg  font-bold my-2 p-3 px-4 py-2'>Logout</button>
            <button onClick={getUserData} className='text-white bg-green-500 hover:bg-green-700 rounded-lg  font-bold my-2 px-4 py-2 '>Get User Details</button>
        </div>
    )
}
