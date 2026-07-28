
import { FaXTwitter } from "react-icons/fa6";

export function AppFooter() {
  return (
    <footer className="border-t px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 bg-background">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Quillo. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a
          href="https://x.com/buildwithshub"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <FaXTwitter className="h-3.5 w-3.5" />
          <span>Follow for updates</span>
        </a>
        <a
          href="https://shubhamgupta.online"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Support
        </a>
      </div>
    </footer>
  );
}
