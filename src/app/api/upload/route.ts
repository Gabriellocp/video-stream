import VideoModel from '@/entities/Video'
import connectDb, { videoBucket } from '@/lib/mongodb'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from "next/server"
import path from 'path'
const uploadPath = path.join(process.cwd(), 'uploads/')
export async function POST(
    req: NextRequest,
) {
    let fileId: mongoose.Types.ObjectId | undefined = undefined
    try {

        await connectDb()
        const form = await req.formData()
        const file = form.get('file')
        const name = form.get('name')
        const description = form.get('description')

        if (!file || !name || !description) {
            return NextResponse.json({ error: 'Provide all fields' }, { status: 400 })
        }
        const fileToWrite = file as File
        // const existFileWithSameName = fs.existsSync(path.join(process.cwd(), 'uploads', fileToWrite.name));
        // if (existFileWithSameName) {
        //     return NextResponse.json({ error: 'File already exist' }, { status: 400 });
        // }
        const buffer = Buffer.from(await fileToWrite.arrayBuffer())
        // if (!fs.existsSync(uploadPath)) {
        //     fs.mkdirSync(uploadPath)
        // }
        // fs.writeFileSync(`${uploadPath}${fileToWrite.name}`, buffer)
        const uploadStream = videoBucket.openUploadStream(fileToWrite.name)

        console.log(description, name)

        uploadStream.end(buffer);

        await new Promise((resolve, reject) => {
            uploadStream.on("finish", resolve);
            uploadStream.on("error", reject);
        });
        fileId = uploadStream.id
        const video = await VideoModel.create({
            description,
            name,
            file: fileId
        })
        return NextResponse.json({ data: video })
    } catch (err) {
        console.log(err)
        if (fileId) {
            await videoBucket.delete(fileId)
        }
        return NextResponse.json({ error: 'Error while uploading file' }, { status: 500 })
    }
}

