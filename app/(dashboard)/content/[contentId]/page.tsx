import { getContent } from "@/features/content/actions/get-content";
import { Badge } from "@/components/ui/badge";
import { ContentDetailsActions } from "@/features/content/components/content-details-actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Image from "next/image";

export default async function ContentDetailsPage({
    params
}: {
    params: Promise<{ contentId: string }>
}) {
    const { contentId } = await params;
    const result = await getContent(contentId);

    if (!result.success || !result.data) {
        notFound();
    }

    const content = result.data;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <Link href="/content" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Content
            </Link>

            <div className="space-y-6 pb-6 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {content.title || "Untitled Content"}
                    </h1>
                    
                    <ContentDetailsActions content={content} />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1">
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
                                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src={file.url}
                                            alt={file.fileName || "Attachment"}
                                            width={600}
                                            height={400}
                                            className="w-full h-48 object-cover"
                                        />
                                    </a>
                                ) : (
                                    <div className="h-48 flex items-center justify-center bg-muted/30">
                                        <span className="text-muted-foreground text-sm">File preview not available</span>
                                    </div>
                                )}
                                <div className="p-3">
                                    <p className="text-sm truncate text-muted-foreground">{file.fileName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
