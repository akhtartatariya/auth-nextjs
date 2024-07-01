'use client'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
export default function verifyPassword() {
    const [email, setEmail] = useState("")

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        try {
            setLoading(true)
            setButtonDisabled(true)
            const response = await axios.post('/api/users/getbyemail', { email })
            console.log("Login Response: ", response.data)
            if (response) {
                toast.success("Please check your email for reset password link")
            }
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            console.log(" Login Error: ", error.message)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (email.length > 0 ) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [email]);
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Sending Email..." : "Reset Password"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input
                className='p-2 border border-gray-300 rounded-lg  mb-4 mt-1 focus:outline-none focus:border-gray-600 text-black'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                value={email}
                type="text" />

            <button disabled={buttonDisabled} onClick={onSubmit} className='p-2 border border-gray-300 rounded-lg  mb-4 mt-1 focus:outline-none focus:border-gray-600'>{buttonDisabled ? "No Submit" : "Submit"}</button>
            <Link href="/login">Login </Link>
            <Link href="/signup">Signup </Link>
        </div>
    )
}
