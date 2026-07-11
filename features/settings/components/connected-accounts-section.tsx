"use client"
import { createLucideIcon, CheckCircle2 } from 'lucide-react';

import { Platform } from "@/features/content/models/content.interface"
import { Button } from '@/components/ui/button';
import { connectSocialAccount, disconnectSocialAccount } from "@/features/schedule/actions/oauth-actions";
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

const LinkedinIcon = createLucideIcon('Linkedin', [
  ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z', key: '1' }],
  ['rect', { width: '4', height: '12', x: '2', y: '9', key: '2' }],
  ['circle', { cx: '4', cy: '4', r: '2', key: '3' }],
]);

const platformIcons: Partial<Record<Platform, any>> = {
    [Platform.TWITTER]: XIcon,
    [Platform.LINKEDIN]: LinkedinIcon
}

export function ConnectAccountsSection({ connectedAccounts}: { connectedAccounts: any[]}){
    const supportedPlatforms = [Platform.TWITTER, Platform.LINKEDIN];

    const handleConnect = async(platform: Platform) => {
        const res = await connectSocialAccount(platform);
        if (res && !res.success) {
            toast.error(res.error || "Failed to connect account");
        }
    }

    const handleDisconnect = async(platform: Platform) => {
        const res = await disconnectSocialAccount(platform);
        if (res.success) {
            toast.success("Account disconnected");
        } else {
            toast.error(res.error || "Failed to disconnect account");
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
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium">{platform.charAt(0) + platform.slice(1).toLowerCase()}</p>
                                    {isConnected && (
                                        <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Connected
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {isConnected ? "Account is ready for automated scheduling and publishing." : "Connect to schedule and publish automatically."}
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-auto shrink-0 flex justify-end">
                            <Button 
                                variant={isConnected ? "outline" : "default"}
                                onClick={() => isConnected ? handleDisconnect(platform) : handleConnect(platform)}
                                className={isConnected ? "w-full sm:w-auto text-destructive hover:bg-destructive/10 border-destructive/20" : "w-full sm:w-auto min-w-[100px]"}
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