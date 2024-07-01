import { connect } from "@/db/connect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        
        if (!email || !password) {
            return NextResponse.json({ error: "All fields are Required" }, { status: 400 });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        
        // console.log("inner try catch block")
        const isCorrect = await bcryptjs.compare(password, user.password);
        if (!isCorrect) {
            return NextResponse.json({ error: "Check your Credentials" }, { status: 400 });
        }
        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: "1d" })


        const response = NextResponse.json({ message: "User Login successfully ", data: user, success: true }, { status: 200 })
        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}