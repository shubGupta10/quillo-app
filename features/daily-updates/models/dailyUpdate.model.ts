import mongoose from "mongoose";
import { IDailyUpdate } from "./dailyUpdate.interface";

const dailyUpdateSchema = new mongoose.Schema<IDailyUpdate>({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'project'
    },
    content: {
        type: String,
        required: true
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
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const DailyUpdate = mongoose.models.dailyUpdate || mongoose.model('dailyUpdate', dailyUpdateSchema);

export default DailyUpdate;