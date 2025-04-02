import fs from 'fs'
import { NextRequest, NextResponse } from "next/server"
import path from 'path'
const uploadPath = path.join(process.cwd(), 'uploads/')
export async function POST(
    req: NextRequest,
) {
    const form = await req.formData()
    const file = form.get('file')
    console.log(file)
    if (!file) {
        return NextResponse.json({ error: 'File not provided' })
    }
    const fileToWrite = file as File
    const buffer = Buffer.from(await fileToWrite.arrayBuffer())
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath)
    }
    fs.writeFileSync(`${uploadPath}${fileToWrite.name}`, buffer)
    return NextResponse.json({ data: true })
}

export async function GET(req: NextRequest) {
    const files = fs.readdirSync(uploadPath)
    return NextResponse.json({
        files
    })
}