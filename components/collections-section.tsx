"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { IDXBrokerWidget } from "@/components/idxbroker-widget";

interface IProps {
  onClicked: () => void;
}

// Datos de propiedades simuladas para cada colección
const generateProperties = (collectionId: string, count: number) => {
  const baseImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  const locations = [
    "Beverly Hills, CA", "Malibu, CA", "Santa Monica, CA", "Manhattan Beach, CA",
    "Pasadena, CA", "Glendale, CA", "Burbank, CA", "West Hollywood, CA"
  ];

  const prices = {
    "new-this-week": ["$850,000", "$1,200,000", "$950,000", "$1,100,000", "$780,000"],
    "reduced-prices": ["$650,000", "$890,000", "$720,000", "$1,050,000", "$680,000"],
    "luxury-estates": ["$2,500,000", "$3,200,000", "$1,800,000", "$4,100,000", "$2,900,000"],
    "family-homes": ["$750,000", "$920,000", "$680,000", "$1,100,000", "$850,000"]
  };

  // Datos fijos para evitar problemas de hidratación
  const bedCounts = [3, 4, 2, 5, 3, 4, 2, 3];
  const bathCounts = [2, 3, 2, 3, 2, 3, 2, 2];
  const sqftValues = [1850, 2200, 1650, 2800, 1950, 2400, 1750, 2100];

  return Array.from({ length: count }, (_, i) => ({
    id: `${collectionId}-${i}`,
    image: baseImages[i % baseImages.length] || baseImages[0], // Fallback a la primera imagen
    price: prices[collectionId as keyof typeof prices]?.[i % 5] || "$800,000",
    location: locations[i % locations.length],
    beds: bedCounts[i % bedCounts.length],
    baths: bathCounts[i % bathCounts.length],
    sqft: sqftValues[i % sqftValues.length]
  }));
};

const collections = [
  {
    id: "reduced-prices",
    title: "Reduced Prices",
    subtitle: "Smart deals and new chances to save big.",
    href: "/collections?filter=reduced",
    properties: generateProperties("reduced-prices", 8)
  }
];

// Componente de carrusel individual
function CollectionCarousel({ collection }: { collection: typeof collections[0] }) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = (224 + 12) * 2; // Ancho de 2 cards (w-56 = 224px) + gaps (gap-3 = 12px)
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="mb-6">
      {/* Header de la colección */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg md:text-xl font-grotesk font-bold text-gray-900 mb-1">
            {collection.title}
          </h3>
          <p className="text-gray-600 text-xs">
            {collection.id === "new-this-week" && (
              <>Fresh listings hitting the market this <span className="bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent font-semibold">week</span>.</>
            )}
            {collection.id === "reduced-prices" && (
              <>Smart deals and new chances to <span className="bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent font-semibold">save big</span>.</>
            )}
          </p>
        </div>

        {/* Botón View All */}
        <Button
          onClick={() => router.push(collection.href)}
          className="hidden md:flex items-center gap-1 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white border-0 transition-all duration-200 shadow-sm hover:shadow-md px-3 py-1.5 text-xs"
        >
          View All
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>

      {/* Carrusel */}
      <div className="relative">
        {/* Botones de navegación - Desktop */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200 hidden md:block"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200 hidden md:block"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Contenedor del carrusel */}
        <div
          ref={scrollRef}
          onScroll={checkScrollButtons}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {collection.properties.map((property) => (
            <div
              key={property.id}
              className="flex-shrink-0 w-56 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Imagen de la propiedad */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.location}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                  <span className="text-xs font-semibold text-gray-900">{property.price}</span>
                </div>
              </div>

              {/* Detalles de la propiedad */}
              <div className="p-2">
                <h4 className="font-semibold text-gray-900 mb-1 truncate text-xs">
                  {property.location}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>{property.beds} beds</span>
                  <span>{property.baths} baths</span>
                  <span>{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón View All - Mobile */}
        <div className="mt-3 md:hidden">
          <Button
            onClick={() => router.push(collection.href)}
            className="w-full flex items-center justify-center gap-1 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white border-0 transition-all duration-200 shadow-sm hover:shadow-md py-2 text-xs"
          >
            View All
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

const CollectionsSection: React.FC<IProps> = ({ onClicked }) => {
  const router = useRouter();

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Header principal */}
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-grotesk font-bold text-gray-900 mb-2">
            Featured <span className="bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent">Collections</span>
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Discover curated property collections tailored to your lifestyle and investment goals.
          </p>
        </div>

        {/* Colecciones con carruseles */}
        <div className="space-y-4">
          {/* Widget IDX para "New This Week" */}
          <div className="mb-6">
            {/* Header de la colección */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-grotesk font-bold text-gray-900 mb-1">
                  New This Week
                </h3>
                <p className="text-gray-600 text-xs">
                  Fresh listings hitting the market this <span className="bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent font-semibold">week</span>.
                </p>
              </div>

              {/* Botón View All - TEMPORALMENTE OCULTO */}
              {/* <Button
                onClick={() => router.push("/collections?filter=new")}
                className="hidden md:flex items-center gap-1 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white border-0 transition-all duration-200 shadow-sm hover:shadow-md px-3 py-1.5 text-xs"
              >
                View All
                <ArrowRight className="w-3 h-3" />
              </Button> */}
            </div>

            {/* Widget IDX */}
            <div className="flex flex-col md:flex-row items-center overflow-x-hidden justify-center">
              <div className="w-full md:w-1/2">
                <IDXBrokerWidget
                  widgetId="121096"
                  title=""
                  className="shadow-none border-none"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full md:w-1/4 mt-3">
                <button onClick={() => onClicked()} type="button" className="w-[70%] bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-2 transition-all duration-200 shadow-sm hover:shadow-md">Schedule a showing</button>
                <img
                  src="/fabiola-patron-updated.jpg"
                  alt="Fabiola Patron"
                  className="w-[70%] h-[60%] object-cover mt-3"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <h1 className="font-medium mt-3">Broker</h1>
                <p className="font-medium mt-3">Phone Number: (323) 350-3137</p>
              </div>
            </div>
          </div>

          {/* Renderizar carrusel normal para otras colecciones - TEMPORALMENTE OCULTO */}
          {/* {collections.map((collection) => (
            <CollectionCarousel key={collection.id} collection={collection} />
          ))} */}
        </div>
      </div>
    </section>
  );
}

export default CollectionsSection;