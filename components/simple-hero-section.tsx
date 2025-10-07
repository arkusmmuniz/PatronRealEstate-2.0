"use client";

import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
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
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Imagen de fondo simplificada */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{
            backgroundImage: `url('/hero-living-room.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/2 via-black/8 to-black/15" />
      </div>

      {/* Contenido principal simplificado */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          {/* Tagline principal */}
          <h1 className="text-3xl md:text-5xl font-grotesk font-bold mb-4 leading-tight text-white drop-shadow-[0_6px_12px_rgba(0,0,0,0.95)]">
            Patron Real Estate
          </h1>

          <p className="text-lg md:text-xl mb-4 text-white font-semibold drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]">
            Your Real Estate Resource
          </p>

          <p className="text-sm md:text-base mb-8 text-white font-medium drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]">
            DRE 02178767
          </p>

          {/* Servicios básicos */}
          <div className="mb-8">
            <p className="text-lg text-white font-semibold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]">
              Services
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <button
                onClick={() => router.push("/buying")}
                className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-lime-500 hover:text-white transition-all duration-200 cursor-pointer border-2 border-gray-200"
              >
                Buy
              </button>
              <button
                onClick={() => router.push("/selling")}
                className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-lime-500 hover:text-white transition-all duration-200 cursor-pointer border-2 border-gray-200"
              >
                Sell
              </button>
              <button
                onClick={() => router.push("/home-value")}
                className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-lime-500 hover:text-white transition-all duration-200 cursor-pointer border-2 border-gray-200"
              >
                Invest
              </button>
              <button
                onClick={() => router.push("/property-management")}
                className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-lime-500 hover:text-white transition-all duration-200 cursor-pointer border-2 border-gray-200"
              >
                Manage
              </button>
            </div>
          </div>

          {/* Barra de búsqueda simplificada */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-2xl border-2 border-white/80 mb-6">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-3"
            >
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white text-gray-800 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all duration-200 placeholder:text-gray-500 shadow-sm"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-xl border-2 border-lime-400"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
