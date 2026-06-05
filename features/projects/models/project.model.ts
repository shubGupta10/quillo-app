import mongoose from "mongoose";
import { IProject, projectStatus } from "./project.interface";

const projectSchema = new mongoose.Schema<IProject>({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(projectStatus),
        default: projectStatus.ACTIVE
    },
    description: {
        type: String,
        required: true
    },
    audience: {
        type: [String],
        required: true
    },
    industry: {
        type: [String],
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Project = mongoose.models.project || mongoose.model('project', projectSchema);

export default Project;