import Link from "next/link";
import { Command } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";


export function MarketingFooter() {
  return (
    <footer className="border-t py-12 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Command className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">Quillo</span>
        </div>
        <p className="mt-4 text-muted-foreground max-w-sm">
          The ultimate content generation platform for builders, makers, and creators. Turn your daily progress into engaging social content effortlessly.
        </p>
        <div className="mt-6 flex space-x-4">
          <a
            href="https://x.com/buildwithshub"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaXTwitter className="h-4 w-4" />
            <span>Follow for updates</span>
          </a>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Quillo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
