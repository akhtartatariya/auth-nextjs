import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export function getUserByEmailToken(request: NextRequest) {
    try {
        const token = request.cookies.get("email")?.value || ""

        if (!token) {
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }
        const data:any = jwt.verify(token, process.env.TOKEN_SECRET_KEY!)
        return data.id       
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}