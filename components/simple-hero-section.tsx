"use client";

import { Button } from "@/components/ui/button";
import { Search, MapPin, Star, Home, Clock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PatronLogo } from "./patron-logo";

export function SimpleHeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirigir a la página de Buyers
    router.push("/buying");
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Imagen de fondo más prominente */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('/hero-living-room.jpg')`,
          }}
        />
        {/* Degradado balanceado para contraste óptimo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/15 to-black/30" />
        {/* Degradado central suavizado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/15" />
      </div>

      {/* Contenido principal corporativo */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Título principal premium */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-grotesk font-bold mb-4 leading-tight text-white">
            Your next move, done <span className="bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent">Right For You</span>.
          </h1>

          {/* Subtítulo premium */}
          <p className="text-base md:text-lg mb-6 text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
            Buying, selling, or investing — every move is guided by your goals, your timeline, and what’s best for you.
          </p>


          {/* Barra de búsqueda moderna y sutil */}
          <div className="mb-6 max-w-3xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="relative"
            >
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by city, neighborhood, ZIP, or MLS ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-16 py-4 bg-white/95 backdrop-blur-sm text-gray-700 rounded-2xl border border-gray-200/50 focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all duration-300 placeholder:text-gray-400 text-sm shadow-lg"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white rounded-xl px-4 py-2 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* CTAs principales compactos */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              onClick={() => router.push("/buying")}
              className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white font-semibold py-2.5 px-6 rounded-md transition-all duration-200 text-sm shadow-sm hover:shadow-md"
            >
              Buy a Home
            </Button>
            <Button
              onClick={() => router.push("/selling")}
              variant="outline"
              className="bg-white/10 border border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold py-2.5 px-6 rounded-md transition-all duration-200 text-sm backdrop-blur-sm"
            >
              Sell with Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
