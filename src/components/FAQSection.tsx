import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is LKTaxi available 24/7?",
    a: "Yes, LKTaxi operates 24 hours a day to ensure travelers can get reliable transportation at any time in Sri Lanka. Whether it is airport pickup, late night travel or early morning tours, our drivers are available to serve you safely and comfortably.",
  },
  {
    q: "Do I need to pay an advance?",
    a: "For normal taxi rides no advance payment is required. However for long tours or special bookings we may request a small 25% advance to confirm the reservation.",
  },
  {
    q: "Are your drivers English speaking?",
    a: "Yes, our drivers are professional and experienced in working with international travelers. Most drivers speak English and are friendly, helpful and knowledgeable about Sri Lanka.",
  },
];

const FAQSection = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="section-title mb-4">Frequently Asked <span className="text-primary">Questions</span></h2>
        <p className="section-subtitle">Everything you need to know about taxi services and travel in Sri Lanka.</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
