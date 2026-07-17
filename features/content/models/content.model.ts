import mongoose from "mongoose";
import { IContent, Status, Platform, Perspective, Tone, ContentLength } from "./content.interface";

const contentSchema = new mongoose.Schema<IContent>({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'project'
    },
    sourceUpdates: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "dailyUpdate",
        }],
        required: true,
    },
    platform: {
        type: String,
        enum: Object.values(Platform),
        required: true
    },
    perspective: {
        type: String,
        enum: Object.values(Perspective),
        required: true
    },
    tone: {
        type: String,
        enum: Object.values(Tone),
        required: true
    },
    contentLength: {
        type: String,
        enum: Object.values(ContentLength),
        required: true
    },
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    contentProfile: {
        topics: [{ type: String }],
        technologies: [{ type: String }],
        hookStyle: { type: String },
        structure: { type: String },
        contentAngle: { type: String },
        writingTone: { type: String },
        detailLevel: { type: String },
    },
    embedding: {
        type: [Number],
        select: false,
    },
    attachment: [
        {
            url: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            fileName: {
                type: String,
                required: true,
            },
            size: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.DRAFT
    },
    scheduledFor: {
        type: Date,
    },
    publishedAt: {
        type: Date
    },
    providerPostId: {
        type: String,
    },
    errorDetails: {
        type: String,
    }
}, { timestamps: true })

contentSchema.index({ projectId: 1, createdAt: -1 })
contentSchema.index({ status: 1, projectId: 1 })

const Content = mongoose.models.content || mongoose.model('content', contentSchema);

export default Content;