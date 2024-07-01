'use client'
import axios from 'axios'
// import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function verifyEmail() {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState("")

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post('/api/users/verifyemail', { token })
            if (response.data) {
                setVerified(true)
                router.push('/login')

            }
            console.log(response.data)
        } catch (error: any) {
            setError(error.message)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        if (urlToken) {
            setToken(urlToken || "")
        }
        // const { query } = router
        // const urlToken = query.token || ""
        // if (urlToken) {
        //     setToken(urlToken.toString())
        // }
    }, [])

    // useEffect(() => {
    //     if (token.length > 0) {
    //         // verifyUserEmail()
    //     }
    // }, [token])
    return (
        <div className=' flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-2xl font-bold text-center text-gray-800 dark:text-white mb-4'>Verify Email</h1>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>verifyUserEmail()}>Click to Verify</button>
            {verified && (
                    <h2>Verified</h2>
            )}
            {error && (
                <div>
                    <h2>{error}</h2>
                </div>
            )}
        </div>
    )
}

