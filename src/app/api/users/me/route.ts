import { connect } from "@/db/connect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
connect()
    

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        if (!userId) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 })
        }

        const user = await User.findOne({ _id: userId }).select("-password")
        if (!user) {
            return NextResponse.json({ error: "User not Found" }, { status: 400 })
        }

        return NextResponse.json({ message: " User Profile found successfully", data: user }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}