"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


interface CustomPaginationProps{
    totalPages: number;
    currentPages: number;
}

export function CustomPagination({ totalPages, currentPages}: CustomPaginationProps){
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathName}?${params.toString()}`
    };
    if(totalPages <= 1) return null;

    return (
        <Pagination className="mt-8">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious 
            href={currentPages > 1 ? createPageUrl(currentPages - 1) : "#"} 
            className={currentPages <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink 
                href={createPageUrl(page)} 
                isActive={currentPages === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {/* Next Button */}
        <PaginationItem>
          <PaginationNext 
            href={currentPages < totalPages ? createPageUrl(currentPages + 1) : "#"} 
            className={currentPages >= totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}