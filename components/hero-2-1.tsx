"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BorderTrail } from "@/components/ui/border-trail";

const Hero2 = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background pt-28 md:pt-36">
      {/* Gradient background with grain effect */}
      <div className="flex flex-col items-end absolute -right-60 -top-10 blur-xl z-0 ">
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-purple-600 to-sky-600"></div>
        <div className="h-[10rem] rounded-full w-[90rem] z-1 bg-gradient-to-b blur-[6rem] from-pink-900 to-yellow-400"></div>
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-yellow-600 to-sky-500"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-noise opacity-30"></div>

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
          <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
            Build in public, without starting from a blank page.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            You already did the hard work today. Log your features, fixes, and lessons, and Quillo instantly transforms them into scheduled social posts.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/sign-in" className="flex items-center justify-center h-12 rounded-full bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90">
              Start Logging
            </Link>
            <Link href="#how-it-works" className="flex items-center justify-center h-12 rounded-full border border-gray-600 px-8 text-base font-medium text-foreground hover:bg-foreground/10">
              How it works
            </Link>
          </div>

          <div className="relative mx-auto my-20 w-full max-w-6xl">
            <div className="absolute inset-0 rounded shadow-lg bg-foreground blur-[10rem] bg-grainy opacity-20" />
            
            <BorderTrail 
              style={{
                boxShadow: '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
              }}
              size={120}
            />

            {/* Hero Image */}
            <img
              src="/hero-image.png"
              alt="Dashboard Preview"
              className="relative w-full h-auto shadow-lg rounded border border-border"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Hero2 };
