
export function AppFooter() {
  return (
    <footer className="border-t px-4 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 bg-background">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Quillo. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
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
