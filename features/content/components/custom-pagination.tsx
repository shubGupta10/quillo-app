"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface CustomPaginationProps {
  totalPages: number;
  currentPages: number;
}

export function CustomPagination({ totalPages, currentPages }: CustomPaginationProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const renderPageItems = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => {
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
      });
    }

    const items = [];

    // Always show page 1
    items.push(
      <PaginationItem key={1}>
        <PaginationLink href={createPageUrl(1)} isActive={currentPages === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (currentPages > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    const start = Math.max(2, currentPages - 1);
    const end = Math.min(totalPages - 1, currentPages + 1);

    for (let p = start; p <= end; p++) {
      if (p !== 1 && p !== totalPages) {
        items.push(
          <PaginationItem key={p}>
            <PaginationLink href={createPageUrl(p)} isActive={currentPages === p}>
              {p}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    if (currentPages < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page
    items.push(
      <PaginationItem key={totalPages}>
        <PaginationLink href={createPageUrl(totalPages)} isActive={currentPages === totalPages}>
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );

    return items;
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPages > 1 ? createPageUrl(currentPages - 1) : "#"}
            className={currentPages <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {renderPageItems()}

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