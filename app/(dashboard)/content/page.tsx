import { getAllContent } from "@/features/content/actions/get-all-content";
import { ContentGrid } from "@/features/content/components/content-grid";
import { CustomPagination } from "@/features/content/components/custom-pagination";
import { Suspense } from "react";
import ContentLoading from "./_components/content-loading";

export default function ContentPage(props: {
    searchParams: Promise<{ page?: string }>
}) {
    return (
        <div className="space-y-8">
            <Suspense fallback={<ContentLoading />}>
                <ContentListContent searchParams={props.searchParams} />
            </Suspense>
        </div>
    );
}

async function ContentListContent(props: {
    searchParams: Promise<{ page?: string }>
}) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams?.page) || 1;

    const result = await getAllContent({ page });

    if (!result.success || !result.data) {
        return (
            <div className="p-8 text-center border rounded-lg bg-destructive text-destructive-foreground">
                Failed to load content. {result.error}
            </div>
        );
    }

    return (
        <>
            <ContentGrid contents={result.data} />

            {result.pagination && (
                <CustomPagination
                    totalPages={result.pagination.pages}
                    currentPages={result.pagination.page}
                />
            )}
        </>
    );
}
