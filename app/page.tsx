"use client";
import { SimpleHeroSection } from "@/components/simple-hero-section";
import CollectionsSection from "@/components/collections-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ContactFormSection } from "@/components/contact-form-section";

export default function HomePage() {

  const scrollToSection = () => {
    const element = document.getElementById("my-section");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex-1">
      <SimpleHeroSection />
      <CollectionsSection onClicked={() => scrollToSection()} />
      <ReviewsSection />
      <section id="my-section">
        <ContactFormSection />
      </section>
    </main>
  );
}
