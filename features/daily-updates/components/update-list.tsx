import { IDailyUpdate } from "../models/dailyUpdate.interface";
import { UpdateCard } from "./update-card";

interface UpdateListProps {
    updates: (IDailyUpdate & { _id: string })[];
}

export function UpdateList({ updates }: UpdateListProps) {
    if (!updates || updates.length === 0) {
        return (
            <div className="p-8 border rounded-lg bg-card text-center space-y-4 py-16">
                <h3 className="text-xl font-semibold">No updates yet</h3>
                <p className="text-muted-foreground">
                    Log your first update to start generating content.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                {updates.map((update) => (
                    <UpdateCard key={update._id} update={update} />
                ))}
            </div>
        </div>
    );
}
