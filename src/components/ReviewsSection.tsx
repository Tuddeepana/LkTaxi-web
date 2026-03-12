import { Star } from "lucide-react";

const reviews = [
  { name: "James W.", country: "UK", rating: 5, text: "Excellent service! The driver was punctual, friendly, and very knowledgeable about Sri Lanka. Highly recommend LKTaxi for anyone visiting." },
  { name: "Maria S.", country: "Germany", rating: 5, text: "We booked a 5-day tour and it was amazing. The van was comfortable and our driver made the trip unforgettable. Will use again!" },
  { name: "Chen L.", country: "China", rating: 5, text: "Very reliable airport transfer service. Clean vehicle, professional driver. Great value for money." },
  { name: "Sophie R.", country: "Australia", rating: 5, text: "The Yala safari was incredible! Our driver knew exactly where to find the leopards. A must-do experience in Sri Lanka." },
];

const ReviewsSection = () => (
  <section className="section-padding bg-muted/30">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title mb-4">What Our <span className="text-primary">Guests</span> Say</h2>
        <p className="section-subtitle">Real experiences from travelers who chose LKTaxi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4 italic">"{r.text}"</p>
            <div>
              <p className="font-semibold text-foreground text-sm">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
