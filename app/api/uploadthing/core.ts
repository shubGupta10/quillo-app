import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    dailyUpdateAttachment: f({
        image: {
            maxFileSize: "8MB",
            maxFileCount: 5,
        },
        pdf: {
            maxFileSize: "16MB",
            maxFileCount: 5,
        },
        text: {
            maxFileSize: "4MB",
            maxFileCount: 5,
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