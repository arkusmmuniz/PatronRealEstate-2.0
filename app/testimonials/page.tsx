"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { useState } from "react";

const testimonials = [
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
];

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
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 mb-6 italic text-base leading-relaxed flex-grow">
                    "{testimonial.comment}"
                  </p>

                  {/* Client info */}
                  <div className="flex items-center space-x-4 mt-auto">
                    <AvatarWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-base">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.location}
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
