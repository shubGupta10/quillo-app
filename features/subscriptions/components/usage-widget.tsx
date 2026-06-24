import { getSubscriptionStatus } from "../actions/get-subscription-status";
import { Zap } from "lucide-react";

export async function UsageWidget() {
    const status = await getSubscriptionStatus();

    if (!status) return null;

    const { used, limit, resetDate, planType } = status;
    const isAdmin = planType === "ADMIN";

    // Admin: show usage count but skip progress bar logic entirely
    if (isAdmin) {
        return (
            <div className="px-3 py-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-sidebar-foreground/70 font-medium">
                        <Zap className="size-3" />
                        Generations
                    </span>
                    <span className="font-semibold text-sidebar-foreground tabular-nums">
                        {used} used
                    </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-primary overflow-hidden">
                    <div className="h-full w-full rounded-full bg-primary" />
                </div>
                <p className="text-xs text-sidebar-foreground/50 leading-snug">
                    Admin · Unlimited
                </p>
            </div>
        );
    }

    const percentage = Math.min((used / limit) * 100, 100);
    const remaining = limit - used;
    const isNearLimit = percentage >= 80;
    const isExhausted = remaining <= 0;

    const planLabel =
        planType === "BETA_PRO" ? "Beta Pro" : "Free";

    return (
        <div className="px-3 py-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-sidebar-foreground/70 font-medium">
                    <Zap className="size-3" />
                    Generations
                </span>
                <span
                    className={`font-semibold tabular-nums ${
                        isExhausted
                            ? "text-destructive"
                            : isNearLimit
                            ? "text-amber-500"
                            : "text-sidebar-foreground"
                    }`}
                >
                    {used}/{limit}
                </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full bg-sidebar-accent overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-300 ${
                        isExhausted
                            ? "bg-destructive"
                            : isNearLimit
                            ? "bg-amber-500"
                            : "bg-primary"
                    }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {isExhausted ? (
                <p className="text-xs text-destructive leading-snug">
                    Limit reached. Resets {new Date(resetDate).toLocaleDateString()}.
                </p>
            ) : (
                <p className="text-xs text-sidebar-foreground/50 leading-snug">
                    {remaining} remaining · {planLabel} plan
                </p>
            )}
        </div>
    );
}
