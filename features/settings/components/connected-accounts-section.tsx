"use client"
import { createLucideIcon } from 'lucide-react';

import { Platform } from "@/features/content/models/content.interface"
import { Button } from '@/components/ui/button';
import { connectSocialAccount } from "@/features/schedule/actions/oauth-actions";
import { toast } from "sonner";

const XIcon = createLucideIcon('X', [
  [
    'path',
    {
      d: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846H16.48l-5.66-7.382-6.47 7.382H.65l8.66-9.914L0 1.153h7.828l5.131 6.784L18.901 1.153Zm-1.29 20.158h2.047L6.026 2.03H3.834l13.777 19.281Z',
      key: 'path-1'
    },
  ],
]);

const platformIcons: Partial<Record<Platform, any>> = {
    [Platform.TWITTER]: XIcon,
}

export function ConnectAccountsSection({ connectedAccounts}: { connectedAccounts: any[]}){
    const supportedPlatforms = [Platform.TWITTER];

    const handleConnect = async(platform: Platform) => {
        const res = await connectSocialAccount(platform);
        if (res && !res.success) {
            toast.error(res.error || "Failed to connect account");
        }
    }

    return (
        <div className='space-y-1'>
            {supportedPlatforms.map((platform) => {
                const isConnected = connectedAccounts.some(acc => acc.provider === platform.toUpperCase());
                const Icon = platformIcons[platform] || XIcon;

                return (
                     <div key={platform} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b last:border-0">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-muted rounded-md shrink-0">
                                <Icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium">{platform.charAt(0) + platform.slice(1).toLowerCase()}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {isConnected ? "Account is connected and ready for scheduling" : "Connect to schedule and publish automatically"}
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-auto sm:min-w-[11rem] shrink-0">
                            <Button 
                                variant={isConnected ? "outline" : "default"}
                                onClick={() => !isConnected && handleConnect(platform)}
                                className={!isConnected ? "w-full sm:w-auto" : "w-full sm:w-auto text-destructive hover:bg-destructive/10"}
                            >
                                {isConnected ? "Disconnect" : "Connect"}
                            </Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}