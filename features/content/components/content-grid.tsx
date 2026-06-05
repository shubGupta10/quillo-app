"use client"

import { useState } from "react";
import { ContentCard } from "./content-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Platform } from "@/features/content/models/content.interface";

interface ContentGridProps {
    contents: any[];
}

export function ContentGrid({ contents }: ContentGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [platformFilter, setPlatformFilter] = useState<string>("All Platforms");

    const uniqueProjects = Array.from(new Set(contents.map(c => c.projectId?.name).filter(Boolean)));
    const [projectFilter, setProjectFilter] = useState<string>("All Projects");
    const [sortBy, setSortBy] = useState<string>("Newest First");

    const filteredContents = contents.filter(content => {
        const matchesSearch = 
            (content.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
            (content.content || "").toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPlatform = platformFilter === "All Platforms" || content.platform === platformFilter;
        const matchesProject = projectFilter === "All Projects" || content.projectId?.name === projectFilter;

        return matchesSearch && matchesPlatform && matchesProject;
    }).sort((a, b) => {
        if (sortBy === "Oldest First") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (sortBy === "Recently Updated") return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div className="space-y-6 w-full">
            {/* Filters Bar */}
            <div className="flex flex-col gap-4">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search generated content..."
                        className="pl-10 h-11 text-base sm:text-sm bg-background shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    <Select value={projectFilter} onValueChange={(val) => setProjectFilter(val || "All Projects")}>
                        <SelectTrigger className="w-auto min-w-[140px] h-9">
                            <SelectValue placeholder="All Projects" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All Projects">All Projects</SelectItem>
                            {uniqueProjects.map((p: any) => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={platformFilter} onValueChange={(val) => setPlatformFilter(val || "All Platforms")}>
                        <SelectTrigger className="w-auto min-w-[140px] h-9">
                            <SelectValue placeholder="All Platforms" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All Platforms">All Platforms</SelectItem>
                            {Object.values(Platform).map(p => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex-1"></div>

                    <Select value={sortBy} onValueChange={(val) => setSortBy(val || "Newest First")}>
                        <SelectTrigger className="w-auto min-w-[140px] h-9">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Newest First">Newest First</SelectItem>
                            <SelectItem value="Oldest First">Oldest First</SelectItem>
                            <SelectItem value="Recently Updated">Recently Updated</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Content Grid */}
            {filteredContents.length > 0 ? (
                <div className="flex flex-col">
                    {filteredContents.map(content => (
                        <ContentCard key={content._id} content={content} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border rounded-lg bg-card/50 border-dashed flex flex-col items-center">
                    <h3 className="text-lg font-medium">No content found</h3>
                    <p className="text-muted-foreground mt-1 mb-6">Try adjusting your filters or search query.</p>
                    <Link href="/projects">
                        <Button variant="outline">Go To Projects</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
