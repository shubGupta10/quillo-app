import { ReviewVariations } from "@/features/content/components/review-variations";

export default async function ReviewPage({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <ReviewVariations projectId={projectId} />
        </div>
    );
}
