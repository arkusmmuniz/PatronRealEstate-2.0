"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { testimonialService } from "@/lib/services";
import { Testimonial } from "@/lib/supabase";
import { Loader2, Star } from "lucide-react";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Claudia Gutierrez",
    rating: 5,
    comment:
      "Gracias Fabiola Patron por ayudarme a obtener mi primera casa 🥰. Después de una experiencia frustrante con otros servicios que tardaban mucho en responder y al final no pudieron calificarme para un préstamo 😟. Fabiola fue atenta, profesional y logró ayudarme a calificar. 100% recomendada 👍❤️",
    location: "Los Angeles",
  },
  {
    name: "BethM",
    rating: 5,
    comment:
      "I am so thankful we found Fabiola. She has an amazing work ethic and took the time to talk with us and listen to what we wanted. She helped us sell our family home of 55 years in Tujunga. Has local resources to help with estates sales, junk removal, plumbing problems, so many things that need doing to sell a home these days and she was on it! Very detail oriented and a great advocate. I highly recommend Fabiola Patron!",
    location: "Tujunga",
  },
  {
    name: "Michelle Pena",
    rating: 5,
    comment:
      "I want to highly recommend working with Fabiola Patron if you're looking to sell your home or buy a home. She was truly a blessing to have on our team when selling my mother's townhome. Fabiola went above and beyond. She was there every step of the process. My mother's home was sold in less than two months from going on the market thanks to the dedication and commitment Fabiola provided. If you're looking for a trusting, professional, and dedicated realtor look no further. Fabiola Patron is the best!!!!",
    location: "Los Angeles",
  },
];

export function ReviewsSection() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const TestimonialsData = await testimonialService.getAllTestimonialsWithRange(0, 2);
      setTestimonials(TestimonialsData);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to load testimonials: ${error}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-lime-600" />
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </div>
    );
  }
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">
            Client <span className="bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent">Reviews</span>
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            See what our clients say about their experience with Patron Real
            Estate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-4">
                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.stars_number)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 mb-3 italic text-sm">"{testimonial.testimonial_description}"</p>

                {/* Client info */}
                <div className="border-t pt-3">
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.author_name}</p>
                  <p className="text-xs text-gray-600">{testimonial.author_location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-6">
          <p className="text-gray-600 mb-3 text-sm">
            Ready to experience the Patron Real Estate difference?
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}
