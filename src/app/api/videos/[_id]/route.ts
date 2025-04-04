import connectDb, { videoBucket } from "@/lib/mongodb";
import mongoose, { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ _id: mongoose.Types.ObjectId }> }) {
    await connectDb()
    // const video = path.join(process.cwd(), 'uploads', (await params)._id)
    const video = await videoBucket.find({ _id: new mongoose.mongo.ObjectId((await params)._id) }).toArray()
    console.log(isValidObjectId((await params)._id))
    if (video.length === 0) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }
    const chunk = (1024 * 1024) * 10
    // const total = fs.statSync(video).size - 1
    console.log(video)
    const total = video[0].length - 1
    const [prevStart, prevEnd] = req.headers.get('range')
        ?.replace('bytes=', '')
        ?.split('/')[0]
        ?.split('-')
        .map(Number)
        ?? []
    const start = prevStart ?? 0
    const end = Math.min(total, start + chunk - 1)
    const headers = new Headers()
    console.log(total)
    headers.append('Content-Range', `bytes ${start}-${end}/${total}`)
    headers.append('Content-Length', `${end - start + 1}`)
    headers.append('Content-Type', `video/mp4`)
    headers.append('Accept-Ranges', `bytes`)
    console.log(start, end)
    const file = new ReadableStream({
        start(controller) {
            // const stream = fs.createReadStream(video, { start, end })
            const stream = videoBucket.openDownloadStream(video[0]._id, { start, end })
            stream.on('data', (chunk) => controller.enqueue(chunk))
            stream.on('end', () => controller.close())
        },
    })
    return new NextResponse(file, { headers, status: 206 })
} 