import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { VALIDATION_LIMITS } from "@/lib/constants/limits";

const f = createUploadthing();

export const ourFileRouter = {
    dailyUpdateAttachment: f({
        image: {
            maxFileSize: VALIDATION_LIMITS.UPLOAD_MAX_IMAGE_SIZE,
            maxFileCount: VALIDATION_LIMITS.UPLOAD_MAX_FILE_COUNT,
        },
        pdf: {
            maxFileSize: VALIDATION_LIMITS.UPLOAD_MAX_PDF_SIZE,
            maxFileCount: VALIDATION_LIMITS.UPLOAD_MAX_FILE_COUNT,
        },
        text: {
            maxFileSize: VALIDATION_LIMITS.UPLOAD_MAX_TEXT_SIZE,
            maxFileCount: VALIDATION_LIMITS.UPLOAD_MAX_FILE_COUNT,
        },
    })
        .middleware(async () => {
            /**
             * We'll add Better Auth verification here
             * after we confirm uploads work.
             */

            return {
                uploadedBy: "user",
            };
        })
        .onUploadComplete(async ({ file }) => {
            console.log("Upload complete");
            console.log(file);

            return {
                url: file.ufsUrl,
                fileName: file.name,
                size: file.size,
                type: file.type,
            };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;