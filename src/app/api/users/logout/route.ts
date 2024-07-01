import { connect } from "@/db/connect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
connect()


export async function GET(_: any) {
    try {

        const response = NextResponse.json({ message: "Logout successfully ", success: true, data: [] }, { status: 200 })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


}
