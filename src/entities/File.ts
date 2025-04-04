import mongoose, { Document, model, Schema } from "mongoose";

// Interface para os arquivos do GridFS
interface IFile extends Document {
    filename: string;
    length: number;
    chunkSize: number;
    uploadDate: Date;
    contentType: string;
}

// Schema baseado na estrutura do GridFS
const FileSchema = new Schema<IFile>({
    filename: { type: String, required: true },
    length: { type: Number, required: true },
    chunkSize: { type: Number, required: true },
    uploadDate: { type: Date, required: true },
    contentType: { type: String, required: true },
}, { collection: "videos.files", versionKey: false });

const FileModel = mongoose.models["videos.files"] || model<IFile>("videos.files", FileSchema);

export default FileModel;
