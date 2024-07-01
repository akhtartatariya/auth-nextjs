import { connect } from "@/db/connect";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
connect()


export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        console.log("working...");

        const { email } = reqBody

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 })
        }
        const tokenData = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: '1d' })

        await sendEmail({ email, emailType: "RESET", userId: user._id })

        const response = NextResponse.json({ message: "User found successfully", data: user }, { status: 200 })
        response.cookies.set("token", token)

        return response
    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}