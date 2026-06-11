import Link from "next/link";
import { marketingNavigation } from "@/constants/navigation";

export function MarketingNavbar() {
  return (
    <header className="h-16 absolute top-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Quillo
        </Link>
        <nav className="hidden md:flex space-x-8">
          {marketingNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            href="/sign-up"
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
