import mongoose, { Document, model, Schema, Types } from "mongoose";
interface IVideo extends Document {
    name: string
    description: string
    file: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}
const VideoSchema = new Schema<IVideo>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: Schema.Types.ObjectId, ref: 'FileSchema', required: true }
}, { timestamps: true })

const VideoModel: mongoose.Model<IVideo> = mongoose.models.Video || model('Video', VideoSchema)
export default VideoModel