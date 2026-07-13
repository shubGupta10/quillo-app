"use client";

import React from 'react';
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Quillo is insane. I used to forget what I shipped by the end of the week. Now my updates are instantly logged and my Twitter grows on autopilot.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Alex Rivera",
    role: "Software Engineer",
  },
  {
    text: "The frictionless logging is the best part. I just drop a quick note in the dashboard and Quillo turns it into a full LinkedIn post. Saved me hours.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sarah Chen",
    role: "Indie Hacker",
  },
  {
    text: "I hate context switching. Being able to quickly document my progress in one place is a game changer for my deep work.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Marcus Johnson",
    role: "Full Stack Developer",
  },
  {
    text: "Finally a tool that understands developers. No more copying and pasting into Notion just to forget about it later.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Emily Watson",
    role: "Open Source Maintainer",
  },
  {
    text: "The auto-scheduling feature means I can queue up a whole week of content on Sunday and just focus on shipping.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "David Kim",
    role: "Startup Founder",
  },
  {
    text: "I've never been consistent with building in public until Quillo. It literally does the heavy lifting for you.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Jessica Taylor",
    role: "Solo Developer",
  },
  {
    text: "Clean, fast, and stays out of your way. Exactly what a developer tool should be. Highly recommend.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Michael Chang",
    role: "Senior Engineer",
  },
  {
    text: "The AI actually sounds like me. It takes my technical bullet points and makes them engaging without being cringy.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ryan Patel",
    role: "Tech Lead",
  },
  {
    text: "If you're an indie hacker trying to grow an audience, Quillo is mandatory. The ROI on time saved is massive.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Amanda Silva",
    role: "Product Creator",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    y: -4,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  className="p-8 rounded-3xl border border-border shadow-lg shadow-black/5 max-w-xs w-full bg-card transition-all duration-300 cursor-default select-none group focus:outline-none" 
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-muted-foreground leading-relaxed font-normal m-0 transition-colors duration-300 text-sm">
                      "{text}"
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/30 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-foreground transition-colors duration-300 text-sm">
                          {name}
                        </cite>
                        <span className="text-xs tracking-tight text-muted-foreground mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section 
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-background py-24 md:py-32 relative overflow-hidden border-t border-border"
    >
      <div className="container px-4 z-10 mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-16 text-center">
          <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-foreground transition-colors">
            Loved by builders
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed transition-colors">
            See how developers are using Quillo to stay consistent, grow their audience, and get back to writing code.
          </p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={30} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={27} />
        </div>
      </div>
    </section>
  );
};
