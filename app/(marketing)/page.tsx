import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Turn your daily work into <span className="text-primary">content</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The SaaS platform that helps builders effortlessly log updates and generate platform-specific posts to share their journey.
        </p>
        <div className="flex items-center justify-center space-x-4 pt-8">
          <Link
            href="/sign-in"
            className="px-8 py-3 text-base font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign In to Dashboard
          </Link>
          <a
            href="#features"
            className="px-8 py-3 text-base font-medium border rounded-md hover:bg-accent transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
