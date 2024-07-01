import { connect } from "@/db/connect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { getDataFromToken } from "@/helper/getDataFromToken";
connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const userId = await getDataFromToken(request)
        const { oldpassword, newpassword } = reqBody

        if (!oldpassword || !newpassword) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }

        const user = await User.findOne({ _id: userId })
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 })
        }

        const correctPassword = bcryptjs.compare(oldpassword, user.password)

        if (!correctPassword) {
            return NextResponse.json({ error: "Something went Wrong" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newpassword, salt)
        const updateUser = await User.findByIdAndUpdate(user._id, {
            $set: {
                password: hashedPassword,

            }
        }, {
            new: true
        })

        if (!updateUser) {
            return NextResponse.json({ error: "Something went Wrong" }, { status: 400 })
        }

        updateUser.forgotPasswordToken = undefined,
            updateUser.forgotPasswordTokenExpiry = undefined,
            await updateUser.save()
        return NextResponse.json({ message: "Password reset successfully", success: true, data: updateUser }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}