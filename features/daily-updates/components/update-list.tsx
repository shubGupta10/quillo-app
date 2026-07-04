"use client"

import { useState } from "react";
import { IDailyUpdate } from "../models/dailyUpdate.interface";
import { UpdateCard } from "./update-card";
import { getDailyUpdates } from "../actions/get-daily-updates";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PenLine } from "lucide-react";

interface UpdateListProps {
    initialUpdates: (IDailyUpdate & { _id: string })[];
    projectId: string;
    initialHasMore: boolean;
}

export function UpdateList({ initialUpdates, projectId, initialHasMore }: UpdateListProps) {
    const [updates, setUpdates] = useState(initialUpdates);
     const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoading, setIsLoading] = useState(false);
    
    if (!initialUpdates || initialUpdates.length === 0) {
        return (
            <EmptyState
                icon={PenLine}
                title="No updates yet"
                description="Log your first update to start generating content."
            />
        );
    }

    const loadMore = async () => {
        setIsLoading(true);
        const nextPage = page + 1;

        try {
            const response = await getDailyUpdates(projectId, nextPage, 5);

            if(response.success && response.data){
                setUpdates((prev) => [...prev, ...response.data])
                setPage(nextPage);

                setHasMore(response.pagination?.hasMore || false);
            }
        } catch (error) {
            console.error("Failed to load more updates", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                {updates.map((update) => (
                    <UpdateCard key={update._id} update={update} />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-4">
                    <Button 
                     variant="outline"
                     onClick={loadMore}
                     disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}
        </div>
    );
}
