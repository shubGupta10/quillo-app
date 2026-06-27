import { getAllContent } from "@/features/content/actions/get-all-content";
import { ContentGrid } from "@/features/content/components/content-grid";
import { CustomPagination } from "@/features/content/components/custom-pagination";

export default async function ContentPage( props: {
    searchParams: Promise<{page?: string}> }) {
        const searchParams = await props.searchParams;
        const page = Number(searchParams?.page) || 1;

        const result = await getAllContent({page});

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {result.success && result.data ? (
                <>
                    <ContentGrid contents={result.data} />

                    {result.pagination && (
                        <CustomPagination
                          totalPages={result.pagination.pages}
                          currentPages={result.pagination.page}
                        />
                    )}
                </>
            ) : (
                <div className="p-8 text-center border rounded-lg bg-destructive/10 text-destructive">
                    Failed to load content. {result.error}
                </div>
            )}
        </div>
    );
}
