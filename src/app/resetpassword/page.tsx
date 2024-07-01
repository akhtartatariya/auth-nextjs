'use client'
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function ResetPassword() {
    const router = useRouter()
    const [user, setUser] = useState({
        oldpassword: "",
        newpassword: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        try {
            setLoading(true)
            setButtonDisabled(true)
            const response = await axios.post('/api/users/resetpassword', user)
            console.log("working...")
            console.log("forgot password Response: ", response.data)
            setLoading(false)
            toast.success("reset password Successfully ")
            router.push('/login') 

        } catch (error: any) {
            setLoading(false)
            console.log(" Login Error: ", error.message)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user.oldpassword.length > 0 && user.newpassword.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user]);
    
    return (

        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Processing..." : "Reset Password"}</h1>
            <hr />

            <label htmlFor="email">Old Password</label>
            <input
                className='p-2 border border-gray-300 rounded-lg  mb-4 mt-1 focus:outline-none focus:border-gray-600 text-black'
                id='password'
                onChange={(e) => setUser({ ...user, oldpassword: e.target.value })}
                placeholder='old password'
                value={user.oldpassword}
                type="password" />
            <label htmlFor="password">New Password</label>
            <input
                className='p-2 border border-gray-300 rounded-lg  mb-4 mt-1 focus:outline-none focus:border-gray-600 text-black'
                id='password'
                onChange={(e) => setUser({ ...user, newpassword: e.target.value })}
                placeholder='new password'
                value={user.newpassword}
                type="password" />
            <button disabled={buttonDisabled} onClick={onSubmit} className='p-2 border border-gray-300 rounded-lg  mb-4 mt-1 focus:outline-none focus:border-gray-600'>{buttonDisabled ? "No Submit" : "Submit"}</button>

        </div>
    )
}
