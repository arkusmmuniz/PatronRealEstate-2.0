"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonialService } from "@/lib/services";
import { useToast } from "@/hooks/use-toast";
import { Testimonial } from "@/lib/supabase";

/* const testimonials = [
  {
    name: "Claudia Gutierrez",
    rating: 5,
    comment:
      "Gracias Fabiola Patron por ayudarme a obtener mi primera casa 🥰. Después de una experiencia frustrante con otros servicios que tardaban mucho en responder y al final no pudieron calificarme para un préstamo 😟. Fabiola fue atenta, profesional y logró ayudarme a calificar. 100% recomendada 👍❤️",
    location: "Los Angeles",
    image: "/image1.png",
  },
  {
    name: "BethM",
    rating: 5,
    comment:
      "I am so thankful we found Fabiola. She has an amazing work ethic and took the time to talk with us and listen to what we wanted. She helped us sell our family home of 55 years in Tujunga. Has local resources to help with estates sales, junk removal, plumbing problems, so many things that need doing to sell a home these days and she was on it! Very detail oriented and a great advocate. I highly recommend Fabiola Patron!",
    location: "Tujunga",
    image: "/image4.png",
  },
  {
    name: "Michelle Pena",
    rating: 5,
    comment:
      "I want to highly recommend working with Fabiola Patron if you're looking to sell your home or buy a home. She was truly a blessing to have on our team when selling my mother's townhome. Fabiola went above and beyond. She was there every step of the process. My mother's home was sold in less than two months from going on the market thanks to the dedication and commitment Fabiola provided. If you're looking for a trusting, professional, and dedicated realtor look no further. Fabiola Patron is the best!!!!",
    location: "Los Angeles",
    image: "/image10.png",
  },
]; */

function AvatarWithFallback({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-14 h-14 rounded-full bg-lime-100 border-2 border-lime-200 flex items-center justify-center">
      {!imageError ? (
        <img
          src={src}
          alt={alt}
          className="w-12 h-12 rounded-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <User className="w-8 h-8 text-lime-600" />
      )}
    </div>
  );
}

export default function TestimonialsPage() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const timeAgo = (date: any) => {
    const now:any = new Date();
    const past:any = new Date(date);

    // --- Calculate year and month differences ---
    let years = now.getFullYear() - past.getFullYear();
    let months = now.getMonth() - past.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    // Adjust for day of month
    if (now.getDate() < past.getDate()) {
      months--;
      if (months < 0) {
        months = 11;
        years--;
      }
    }

    // If at least 1 year → return years
    if (years >= 1) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    }

    // If less than 1 year but at least 1 month → return months
    if (months >= 1) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }

    // --- Fallback to normal time-ago below 1 month ---
    const diff = (now - past) / 1000; // seconds

    const units = [
      { name: "week", secs: 60 * 60 * 24 * 7 },
      { name: "day", secs: 60 * 60 * 24 },
      { name: "hour", secs: 60 * 60 },
      { name: "minute", secs: 60 },
      { name: "second", secs: 1 }
    ];

    for (let unit of units) {
      const value = Math.floor(diff / unit.secs);
      if (value >= 1) {
        return `${value} ${unit.name}${value > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const TestimonialsData = await testimonialService.getAllTestimonials();
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
    <main className="flex-1 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lime-50 to-white py-12 md:py-16 mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              ❤️ What Clients Are Saying
            </h1>
            <div className="w-24 h-1 bg-lime-500 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
              At Patron Real Estate, we believe that relationships matter just
              as much as results. Nothing means more to us than the trust our
              clients place in our hands—and we're proud to have helped so many
              individuals and families navigate their real estate journeys with
              confidence, clarity, and care.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border-2 border-lime-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.stars_number)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 mb-6 italic text-base leading-relaxed flex-grow">
                    "{testimonial.testimonial_description}"
                  </p>

                  {/* Client info */}
                  <div className="flex items-center space-x-4 mt-auto">
                    {testimonial.author_picture_url ? (
                      <AvatarWithFallback
                        src={testimonial.author_picture_url}
                        alt={testimonial.author_name}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-lime-100 border-2 border-lime-200 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user w-10 h-10 text-lime-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-base">
                        {testimonial.author_name}
                      </p>
                      <p className="font-semibold text-gray-900 text-base">
                        {timeAgo(testimonial.publication_date)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Ready to Experience the Patron Real Estate Difference?
          </h2>
          <p className="text-base text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our satisfied clients and discover why Patron Real Estate is
            the trusted choice for all your real estate needs in Los Angeles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-block bg-lime-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-lime-600 transition-colors duration-200"
            >
              Contact Fabiola Today
            </a>
            <a
              href="/buying"
              className="inline-block border-2 border-lime-500 text-lime-600 px-6 py-3 rounded-lg font-semibold hover:bg-lime-500 hover:text-white transition-colors duration-200"
            >
              View Properties
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
