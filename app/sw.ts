/// <reference lib="webworker" />
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig, RuntimeCaching } from "serwist";
import { Serwist, StaleWhileRevalidate } from "serwist";

declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

const instantPageCache: RuntimeCaching[] = [
    {
        matcher: ({ request }) => request.mode === "navigate",
        handler: new StaleWhileRevalidate({
            cacheName: "page-cache",
        }),
    },
    ...defaultCache,
]

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: instantPageCache,
});

serwist.addEventListeners();
