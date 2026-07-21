import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BentoGridShowcase } from "@/components/bento-product-features";
import {
  Edit3,
  FolderGit2,
  LibraryBig,
  Lightbulb,
  Sparkles,
  CalendarClock,
} from "lucide-react";
import { FaTwitter, FaLinkedin } from "react-icons/fa6";

const IntegrationCard = () => (
  <Card className="flex h-full flex-col bg-card">
    <CardHeader>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
        <Edit3 className="h-6 w-6 text-primary" />
      </div>
      <CardTitle>Daily Logs</CardTitle>
      <CardDescription>
        Write down what you worked on today. Just plain text. We use this to generate your content.
      </CardDescription>
    </CardHeader>
    <CardFooter className="mt-auto flex flex-col items-start pb-6">
      {/* Minimal Editor UI */}
      <div className="w-full bg-background rounded-lg border border-border p-4 shadow-sm font-mono text-xs text-muted-foreground">
        <div className="flex gap-2 mb-3 border-b border-border pb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-muted" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted" />
          <div className="w-2.5 h-2.5 rounded-full bg-muted" />
        </div>
        <p className="text-primary mb-2 font-semibold"># Daily Log - Oct 24</p>
        <p className="mb-1 text-foreground">- Shipped the new onboarding flow</p>
        <p className="mb-1 text-foreground">- Fixed the auth bug on mobile</p>
        <p className="animate-pulse text-primary">_</p>
      </div>
    </CardFooter>
  </Card>
);

const TrackersCard = () => (
  <Card className="h-full bg-card">
    <CardContent className="flex h-full flex-col justify-between p-6">
      <div>
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <FolderGit2 className="h-5 w-5 text-foreground" />
        </div>
        <CardTitle className="text-base font-medium">
          Project Context
        </CardTitle>
        <CardDescription className="mt-2">
          Group your logs by project. This helps the AI understand exactly what each app is about.
        </CardDescription>
      </div>
      {/* Minimal Folder Tree UI */}
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary border border-border">
          <div className="h-6 w-6 rounded bg-background flex items-center justify-center">
            <FolderGit2 className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">Quillo App</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-md bg-background border border-border">
          <div className="h-6 w-6 rounded bg-muted flex items-center justify-center">
            <FolderGit2 className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">Open Source Lib</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FocusCard = () => (
  <Card className="h-full bg-card">
    <CardContent className="flex h-full flex-col justify-between p-6">
      <div>
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
          <Lightbulb className="h-5 w-5 text-accent" />
        </div>
        <CardTitle className="text-base font-medium">Generate Ideas</CardTitle>
        <CardDescription className="mt-2">
          Turn your boring technical logs into engaging ideas for social media posts.
        </CardDescription>
      </div>
      {/* Minimal Idea List UI */}
      <div className="mt-6 flex flex-col gap-4">
        {[80, 60, 90].map((width, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <div className="h-2 bg-muted rounded-full w-full relative overflow-hidden">
              <div className="h-full bg-secondary absolute left-0 top-0" style={{ width: `${width}%` }} />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const StatisticCard = () => (
  <Card className="relative h-full w-full overflow-hidden bg-card">
    <CardContent className="relative z-10 flex h-full flex-col p-6">
      <div className="flex items-center gap-3 mb-2">
        <LibraryBig className="h-5 w-5 text-primary" />
        <CardTitle className="text-base font-medium">Saved Posts</CardTitle>
      </div>
      <CardDescription className="mb-6 text-sm">
        Store your generated and edited posts in a single library for later.
      </CardDescription>
      {/* Minimal Saved Posts Grid UI */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <div className="h-24 rounded-lg bg-background border border-border p-3 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
          <FaTwitter className="h-4 w-4 text-foreground mb-3" />
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-muted rounded-full" />
            <div className="h-1.5 w-4/5 bg-muted rounded-full" />
          </div>
        </div>
        <div className="h-24 rounded-lg bg-secondary border border-border p-3 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
          <FaLinkedin className="h-4 w-4 text-foreground mb-3" />
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-muted rounded-full" />
            <div className="h-1.5 w-1/2 bg-muted rounded-full" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProductivityCard = () => (
  <Card className="h-full relative overflow-hidden bg-card">
    <CardContent className="flex h-full flex-col p-6 z-10 relative">
      <div className="flex items-center gap-3 mb-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <CardTitle className="text-base font-medium text-foreground">
          Smart AI Writer
        </CardTitle>
      </div>
      <CardDescription className="mb-6">
        The AI reads your entire project history, so it actually understands the context of your updates.
      </CardDescription>
      {/* Minimal AI Generation UI */}
      <div className="mt-auto bg-background rounded-lg p-4 border border-border shadow-sm">
        <div className="flex gap-2 items-center mb-4">
          <div className="h-6 w-6 rounded bg-secondary flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-primary" />
          </div>
          <div className="h-2 w-16 bg-muted rounded-full" />
        </div>
        <div className="space-y-3">
          <div className="h-2 w-full bg-secondary rounded-full relative overflow-hidden">
             <div className="h-full bg-muted absolute left-0 top-0 w-full animate-pulse" />
          </div>
          <div className="h-2 w-full bg-secondary rounded-full relative overflow-hidden">
             <div className="h-full bg-muted absolute left-0 top-0 w-full animate-pulse" />
          </div>
          <div className="h-2 w-3/4 bg-secondary rounded-full relative overflow-hidden">
             <div className="h-full bg-muted absolute left-0 top-0 w-full animate-pulse" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ShortcutsCard = () => (
  <Card className="h-full bg-card">
    <CardContent className="flex h-full flex-col p-6">
      <div className="flex items-center gap-3 mb-2">
        <CalendarClock className="h-5 w-5 text-accent" />
        <CardTitle className="text-base font-medium">Post Scheduling</CardTitle>
      </div>
      <CardDescription>
        Plan when to publish your posts. We'll remind you when it's time to share them.
      </CardDescription>
      {/* Minimal Schedule Timeline UI */}
      <div className="mt-auto flex gap-2 pt-6">
        {["Mon", "Tue", "Wed", "Thu"].map((day, i) => (
          <div key={day} className={`flex-1 flex flex-col items-center justify-center py-3 rounded-md border ${i === 2 ? 'bg-secondary border-primary' : 'bg-background border-border'}`}>
            <span className={`text-xs font-medium mb-2 ${i === 2 ? 'text-primary' : 'text-muted-foreground'}`}>{day}</span>
            <div className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-primary shadow-sm' : 'bg-muted'}`} />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export function BentoGridShowcaseDemo() {
  return (
    <div className="w-full py-24 md:py-32 px-6 lg:px-10 max-w-7xl mx-auto bg-background" id="features">
      <div className="mb-16 flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Turn your code into content
        </h2>
        <p className="text-lg text-muted-foreground">
          Write daily logs about what you build. We generate the social media posts for you.
        </p>
      </div>

      <BentoGridShowcase
        integration={<IntegrationCard />}
        trackers={<TrackersCard />}
        statistic={<StatisticCard />}
        focus={<FocusCard />}
        productivity={<ProductivityCard />}
        shortcuts={<ShortcutsCard />}
      />
    </div>
  );
}
