import React from "react";
import { Command, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Changelog", href: "#" },
      { name: "Documentation", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { text: "X", href: "#", label: "Twitter" },
  { text: "GitHub", href: "#", label: "GitHub" },
  { text: "LinkedIn", href: "#", label: "LinkedIn" },
];

export const Footer7 = () => {
  return (
    <footer className="bg-background border-t border-border pt-24 md:pt-32 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Final CTA Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24 md:mb-32">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Ready to stop context switching?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Log your daily progress while it's fresh, and let Quillo turn your work into content when you're ready to share it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="gap-2" render={<Link href="/sign-up" />} nativeButton={false}>
              Join the Beta <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="#features" />} nativeButton={false}>
              View Features
            </Button>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left border-t border-border pt-16">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start max-w-sm">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start text-primary">
              <Command className="w-6 h-6" />
              <h2 className="text-xl font-bold tracking-tight text-foreground">Quillo</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The frictionless engineering journal. Log your progress natively, let AI write the thread, and schedule it instantly.
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground mt-4">
              {defaultSocialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary transition-colors">
                  <a href={social.href} aria-label={social.label} className="font-medium text-sm">
                    {social.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid w-full gap-8 grid-cols-2 md:grid-cols-3 lg:gap-16">
            {defaultSections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-semibold text-foreground">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary transition-colors"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center text-center md:text-left">
          <p>© {new Date().getFullYear()} Quillo Inc. All rights reserved.</p>
          <p>
            Made by <a href="https://shubhamgupta.online" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:underline hover:text-primary transition-colors">Shubham Gupta</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

