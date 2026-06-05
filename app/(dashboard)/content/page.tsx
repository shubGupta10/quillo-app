import { getAllContent } from "@/features/content/actions/get-all-content";
import { ContentGrid } from "@/features/content/components/content-grid";

export default async function ContentPage() {
    const result = await getAllContent();

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {result.success && result.data ? (
                <ContentGrid contents={result.data} />
            ) : (
                <div className="p-8 text-center border rounded-lg bg-destructive/10 text-destructive">
                    Failed to load content. {result.error}
                </div>
            )}
        </div>
    );
}
