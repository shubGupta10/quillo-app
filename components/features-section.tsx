import { BentoGridShowcase } from "@/components/bento-product-features";
import { Edit3, Sparkles, CalendarClock, FolderGit2, LibraryBig, Lightbulb } from "lucide-react";

function FeatureCard({ title, description, icon: Icon, children, className = "" }: any) {
  return (
    <div className={`relative flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${className}`}>
      <div className="relative z-10 p-6 md:p-8 flex-1 flex flex-col bg-card/90 backdrop-blur-[2px]">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground text-lg">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        <div className="mt-6 flex-1 flex items-end">
          {children}
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Everything you need to build in public
          </h2>
          <p className="text-lg text-muted-foreground">
            Quillo takes the friction out of content creation so you can focus on writing code.
          </p>
        </div>

        <BentoGridShowcase
          integration={
            <FeatureCard
              title="Frictionless Logging"
              description="Jot down your fixes, features, and thoughts the moment they happen. Quillo acts as your private engineering journal."
              icon={Edit3}
            >
              <div className="w-full bg-background rounded-lg border border-border p-4 shadow-sm mt-4">
                <div className="text-xs text-muted-foreground mb-2">Today at 2:30 PM</div>
                <div className="text-sm font-medium text-foreground">Fixed the Google OAuth issue. Atlas IP restrictions were blocking the production build...</div>
              </div>
            </FeatureCard>
          }
          trackers={
            <FeatureCard
              title="Project Organization"
              description="Manage multiple side-hustles in one account. Each project maintains its own context and logs."
              icon={FolderGit2}
            />
          }
          statistic={
            <FeatureCard
              title="Content Library"
              description="Save your best generated posts to publish whenever."
              icon={LibraryBig}
            />
          }
          focus={
            <FeatureCard
              title="Content Ideas"
              description="Get multiple post angles and content opportunities from a single daily log."
              icon={Lightbulb}
            />
          }
          productivity={
            <FeatureCard
              title="Contextual Generation"
              description="The AI uses your project's history as context, ensuring posts sound authentic and technical."
              icon={Sparkles}
            />
          }
          shortcuts={
            <FeatureCard
              title="Smart Scheduling"
              description="Schedule content internally and get reminded when it's time to publish. Maintain full control over your accounts."
              icon={CalendarClock}
            >
              <div className="w-full h-12 bg-background rounded-lg border border-border flex items-center justify-between px-4 mt-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-foreground">Next reminder scheduled</span>
                </div>
                <span className="text-xs text-muted-foreground">Tomorrow, 9:00 AM</span>
              </div>
            </FeatureCard>
          }
        />
      </div>
    </section>
  );
}
