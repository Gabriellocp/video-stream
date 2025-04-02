import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
    const video = path.join(process.cwd(), 'uploads', (await params).name)
    const chunk = (1024 * 1024) * 10
    const total = fs.statSync(video).size - 1
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
            const stream = fs.createReadStream(video, { start, end })
            stream.on('data', (chunk) => controller.enqueue(chunk))
            stream.on('end', () => controller.close())
        },
    })
    return new NextResponse(file, { headers, status: 206 })
} 