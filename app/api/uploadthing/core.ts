import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { VALIDATION_LIMITS } from "@/lib/constants/limits";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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
            const session = await auth.api.getSession({
                headers: await headers()
            });

            if (!session?.user?.id) {
                throw new UploadThingError("Unauthorized");
            }

            return {
                uploadedBy: session.user.id,
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