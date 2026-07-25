import mongoose from "mongoose";
import { FeedbackCategory, IFeedback } from "./feedback.interface";

export { FeedbackCategory, type IFeedback };

export interface IFeedbackDocument extends Omit<IFeedback, "authUserId"> {
    authUserId: mongoose.Schema.Types.ObjectId;
}

const feedbackSchema = new mongoose.Schema<IFeedbackDocument>({
    authUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "authUsers",
    },
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        default: "User",
    },
    category: {
        type: String,
        enum: Object.values(FeedbackCategory),
        default: FeedbackCategory.GENERAL,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Feedback = mongoose.models.feedback || mongoose.model("feedback", feedbackSchema);

export default Feedback;
