"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Image from "next/image";

const Hero2 = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-28 md:pt-36">
      <div className="absolute inset-0 z-0 bg-noise opacity-30 pointer-events-none"></div>
      
      {/* Professional subtle top glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[30rem] bg-primary/10 blur-[8rem] pointer-events-none rounded-full z-0" />

      {/* Content container */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-foreground/10 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm font-medium text-foreground">
            Quillo is now in Beta
          </span>
          <ArrowRight className="h-4 w-4 text-foreground" />
        </div>

        {/* Hero section */}
        <div className="container mx-auto mt-12 px-4 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Build in public, without starting from a blank page.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            You already did the hard work today. Log your features, fixes, and lessons, and Quillo instantly transforms them into scheduled social posts.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/sign-in" className="flex items-center justify-center h-12 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90">
              Join the Beta
            </Link>
            <Link href="#features" className="flex items-center justify-center h-12 rounded-full border border-border px-8 text-base font-medium text-foreground hover:bg-foreground/10 transition-colors">
              Explore Features
            </Link>
          </div>

          <div className="relative mx-auto my-20 w-full max-w-6xl">
            {/* Subtle, static primary glow to direct attention */}
            <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-2xl opacity-50 pointer-events-none" />

            {/* Hero Video Facade */}
            <div 
              className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-border bg-background/50 group cursor-pointer"
              onClick={() => setIsVideoPlaying(true)}
            >
              {!isVideoPlaying ? (
                <>
                  <Image
                    src="/hero-image.png"
                    alt="Quillo Dashboard Preview"
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02] opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-500">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-8 w-8 ml-2" fill="currentColor" />
                    </div>
                  </div>
                </>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/EQdzYdryV0g?rel=0&modestbranding=1&autoplay=1"
                  title="Quillo Product Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Hero2 };
