'use client'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function Signup() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            setButtonDisabled(true)
            const response = await axios.post('/api/users/signup', user)
            console.log("Signup Response: ", response.data)
            router.push('/login')
        } catch (error: any) {
            console.log(" Signup Error: ", error.message)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user]);
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Processing..." : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
            className='p-2 border border-gray-300 rounded-lg mb-4 mt-1 focus:outline-none focus:border-gray-600 text-black' 
                id='username'
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder='username'
                value={user.username}
                type="text" />
            <label htmlFor="email">Email</label>
            <input
            className='p-2 border border-gray-300 rounded-lg  mb-4 mt-1 focus:outline-none focus:border-gray-600 text-black'
                id='email'
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='email'
                value={user.email}
                type="text" />
            <label htmlFor="password">Password</label>
            <input
            className='p-2 border border-gray-300 rounded-lg  mb-4 mt-1 focus:outline-none focus:border-gray-600 text-black'
                id='password'
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='password'
                value={user.password}
                type="password" />
            <button disabled={buttonDisabled} onClick={onSignup} className='p-2 border border-gray-300 rounded-lg  mb-4 mt-1 focus:outline-none focus:border-gray-600'>{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Login</Link>    
        </div>
    )
}


