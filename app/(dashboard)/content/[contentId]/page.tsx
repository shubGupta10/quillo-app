import { getContent } from "@/features/content/actions/get-content";
import { Badge } from "@/components/ui/badge";
import { ContentDetailsActions } from "@/features/content/components/content-details-actions";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getOrCreateSubscription } from "@/features/subscriptions/services/usage.service";
import { PlanType } from "@/features/subscriptions/model/subscriptions.interface";
import Image from "next/image";
import { BreadcrumbSetter } from "@/components/layout/breadcrumb-setter";

import { Suspense } from "react";
import ContentDetailsLoading from "./loading";

export default function ContentDetailsPage({
    params
}: {
    params: Promise<{ contentId: string }>
}) {
    return (
        <div className="space-y-8">
            <Suspense fallback={<ContentDetailsLoading />}>
                <ContentDetailsContent params={params} />
            </Suspense>
        </div>
    );
}

async function ContentDetailsContent({
    params
}: {
    params: Promise<{ contentId: string }>
}) {
    const { contentId } = await params;
    const result = await getContent(contentId);

    const session = await auth.api.getSession({
        headers: await headers()
    })
    let isPremium = false;
    if (session?.user.id) {
        const subscription = await getOrCreateSubscription(session.user.id);
        isPremium = subscription.planType !== PlanType.FREE
    }

    if (!result.success || !result.data) {
        notFound();
    }

    const content = result.data;

    return (
        <>
            <BreadcrumbSetter title={content.title || "Untitled Content"} />

            <div className="space-y-6 pb-6 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {content.title || "Untitled Content"}
                    </h1>

                    <ContentDetailsActions content={content} isPremium={isPremium} />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="px-3 py-1">
                        {content.platform}
                    </Badge>
                    <Badge variant="secondary" className="px-3 py-1">
                        {content.status}
                    </Badge>
                    {content.projectId?.name && (
                        <Badge variant="outline" className="text-muted-foreground border-border px-3 py-1">
                            Project: {content.projectId.name}
                        </Badge>
                    )}
                    <span className="text-sm text-muted-foreground ml-auto">
                        Created {new Date(content.createdAt).toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-medium leading-relaxed text-card-foreground">
                    {content.content}
                </div>
            </div>

            {content.attachment && content.attachment.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight">Attachments</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {content.attachment.map((file: any, idx: number) => (
                            <div key={idx} className="border rounded-lg overflow-hidden bg-card shadow-sm">

                                {file.type?.startsWith("image") ? (
                                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="block relative h-48 bg-muted">
                                        <Image
                                            src={file.url}
                                            alt={file.fileName || "Attachment"}
                                            width={600}
                                            height={400}
                                            className="w-full h-48 object-cover"
                                        />
                                    </a>
                                ) : file.type?.startsWith("video") || /\.(mp4|webm|mov|mkv)$/i.test(file.url) ? (
                                    <div className="h-48 bg-muted flex items-center justify-center">
                                        <video
                                            src={file.url}
                                            controls
                                            preload="metadata"
                                            className="w-full h-48 object-contain"
                                        />
                                    </div>
                                ) : (
                                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="h-48 flex flex-col items-center justify-center bg-muted hover:bg-accent transition-colors gap-2">
                                        <span className="text-muted-foreground text-sm">View Document</span>
                                    </a>
                                )}
                                <div className="p-3">
                                    <p className="text-sm truncate text-muted-foreground">{file.fileName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
