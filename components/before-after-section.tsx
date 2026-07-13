import { ImageComparisonSlider } from "@/components/image-comparison-slider-horizontal";
import { BorderTrail } from "@/components/ui/border-trail";

const MessyBeforeUI = () => (
  <div className="w-full h-full bg-[#0d1117] flex flex-col pointer-events-none p-6 md:p-10 font-mono text-sm md:text-base border-r-4 border-red-500/20 shadow-inner">
    <div className="flex space-x-2 mb-6">
      <div className="w-3 h-3 rounded-full bg-red-500/50" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
      <div className="w-3 h-3 rounded-full bg-green-500/50" />
    </div>
    <div className="text-muted-foreground/60 mb-4">{"// The Old Way: Context Switching"}</div>
    <div className="text-red-400">import <span className="text-foreground">{"{ Browser }"}</span> from <span className="text-green-300">"distraction"</span>;</div>
    <div className="text-red-400">import <span className="text-foreground">{"{ Notion }"}</span> from <span className="text-green-300">"messy-workspace"</span>;</div>
    <div className="text-red-400 mb-6">import <span className="text-foreground">{"{ Focus }"}</span> from <span className="text-green-300">"brain"</span>;</div>
    
    <div className="text-purple-400">async function <span className="text-blue-400">postDailyUpdate</span>() {"{"}</div>
    <div className="pl-4 text-foreground opacity-60">{"// ❌ Open browser, lose context"}</div>
    <div className="pl-4 text-foreground mb-2"><span className="text-red-400">await</span> Focus.<span className="text-blue-400">lose</span>();</div>
    
    <div className="pl-4 text-foreground opacity-60">{"// ❌ Spend 15 mins drafting a thread"}</div>
    <div className="pl-4 text-foreground mb-2"><span className="text-red-400">const</span> draft = <span className="text-red-400">await</span> Notion.<span className="text-blue-400">findDoc</span>(<span className="text-green-300">"where-is-it.md"</span>);</div>
    
    <div className="pl-4 text-foreground opacity-60">{"// ❌ Fix X/Twitter formatting errors"}</div>
    <div className="pl-4 text-foreground mb-4"><span className="text-red-400">await</span> Browser.<span className="text-blue-400">struggleWithCharacterLimit</span>(draft);</div>
    
    <div className="pl-4 text-red-400">return <span className="text-foreground">{"{"}</span> frustration: <span className="text-green-300">"high"</span> <span className="text-foreground">{"}"}</span>;</div>
    <div className="text-foreground">{"}"}</div>
  </div>
);

const CleanAfterUI = () => (
  <div className="w-full h-full bg-[#0d1117] flex flex-col pointer-events-none p-6 md:p-10 font-mono text-sm md:text-base border-l-4 border-primary/50 shadow-xl">
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded border border-primary/30 uppercase tracking-widest font-sans font-bold">The Quillo Way</div>
    </div>
    
    <div className="text-primary mb-6">import <span className="text-foreground">{"{ Quillo }"}</span> from <span className="text-green-300">"@quillo/sdk"</span>;</div>
    
    <div className="text-purple-400">async function <span className="text-blue-400">shipFeature</span>() {"{"}</div>
    <div className="pl-4 text-foreground opacity-80 mb-2">{"// ✅ 1. Build your feature in peace"}</div>
    <div className="pl-4 text-foreground mb-4"><span className="text-red-400">await</span> <span className="text-blue-400">code</span>();</div>
    
    <div className="pl-4 text-foreground opacity-80 mb-2">{"// ✅ 2. Log it natively without leaving the IDE"}</div>
    <div className="pl-4 text-foreground mb-6"><span className="text-red-400">await</span> Quillo.<span className="text-blue-400">log</span>(<span className="text-green-300">"Fixed the Google OAuth IP restriction bug."</span>);</div>
    
    <div className="pl-4 text-primary opacity-90 mb-2">{"// ✨ Quillo's AI auto-generates & schedules the post"}</div>
    <div className="pl-4 text-red-400">return <span className="text-foreground">{"{"}</span> status: <span className="text-green-300">"Shipped & Posted"</span>, focus: <span className="text-green-300">"Maintained"</span> <span className="text-foreground">{"}"}</span>;</div>
    <div className="text-foreground">{"}"}</div>
  </div>
);

export function BeforeAfterSection() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Stop switching context.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Content creation shouldn't feel like a chore. Compare the chaotic reality of traditional posting with the frictionless experience of Quillo.
          </p>
        </div>

        <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden border border-border shadow-2xl">
          <ImageComparisonSlider
            leftContent={<MessyBeforeUI />}
            rightContent={<CleanAfterUI />}
            initialPosition={50}
          />
        </div>
      </div>
    </section>
  );
}
