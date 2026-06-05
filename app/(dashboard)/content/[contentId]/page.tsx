import { getContent } from "@/features/content/actions/get-content";
import { Badge } from "@/components/ui/badge";
import { ContentDetailsActions } from "@/features/content/components/content-details-actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8 space-y-8">
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

            <div className="bg-card border rounded-lg p-8 shadow-sm">
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-medium leading-relaxed text-card-foreground">
                    {content.content}
                </div>
            </div>
        </div>
    );
}
