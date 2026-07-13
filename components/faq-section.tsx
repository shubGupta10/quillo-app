import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "Is Quillo free to use?",
      answer: "Quillo is currently 100% free while we are in our closed beta. Right now, our primary focus is gathering feedback from early builders to refine the product workflow before introducing paid plans.",
    },
    {
      question: "Does Quillo post directly to my accounts?",
      answer: "Yes, but support varies by platform due to API access. LinkedIn publishing is fully supported. X (Twitter) publishing is implemented but currently blocked by API pricing limitations, and Reddit publishing is waiting for API approval. You can easily copy approved content for those platforms.",
    },
    {
      question: "Does the AI actually sound like me?",
      answer: "Generic AI writers sound generic because they lack context. Quillo uses your actual, technical engineering logs as the core context. The generated content reflects what you actually built, not generic marketing fluff.",
    },
    {
      question: "Can I manage multiple side-projects?",
      answer: "Yes. You can create multiple Projects in Quillo. Each Project maintains its own context, daily logs, and generated content, keeping your different side-hustles perfectly organized.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background border-t border-border" id="faq">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Frequently asked questions
          </h2>
        </div>
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border py-2">
              <AccordionTrigger className="text-lg font-medium text-left hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-4 pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
