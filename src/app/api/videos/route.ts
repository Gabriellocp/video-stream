import VideoModel from "@/entities/Video"
import connectDb from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    await connectDb()
    // const files = fs.readdirSync(uploadPath)
    // const files = await FileModel.find()
    const files = await VideoModel.find()
    return NextResponse.json({
        files
    })
}