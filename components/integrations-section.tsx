import { Marquee } from "@/components/ui/marquee";

const integrations = [
  "X",
  "LinkedIn",
  "Reddit",
  "Hashnode",
  "Notion",
  "GitHub",
  "Medium",
];

export function IntegrationsSection() {
  return (
    <section className="py-24 overflow-hidden border-t border-border bg-background relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Publish directly to your favorite platforms
          </p>
        </div>
        
        <div className="relative mt-4">
          {/* Fading edges to make the marquee look seamless */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background z-10"></div>
          
          <Marquee speed={40} pauseOnHover className="mt-8 sm:mt-12">
            {integrations.map((integration, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-center mx-8 md:mx-16 text-2xl md:text-4xl font-bold text-muted-foreground/60 hover:text-foreground transition-colors duration-300 select-none cursor-default"
              >
                {integration}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
