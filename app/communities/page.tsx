"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin, 
  Users,
  Home, 
  TreePine, 
  Mountain,
  Heart,
  Star,
  ArrowRight,
  Calendar,
  Building2
} from "lucide-react";
import { useRouter } from "next/navigation";

// Community interface
interface LocalCommunity {
  id: string;
  name: string;
  emoji: string;
  population: string;
  description: string;
  image: string;
  highlights: string[];
  demographics: string;
  atmosphere: string;
  avgHomePrice: string;
  medianAge: string;
  keyFeatures: string[];
}

// Local community data
const localCommunities: LocalCommunity[] = [
  {
    id: "tujunga",
    name: "Tujunga",
    emoji: "🌄",
    population: "27,000",
    description: "A tight-knit community nestled in the foothills, known for its quiet charm and strong community connection.",
    image: "/image3.png",
    highlights: ["Bolton Hall Museum", "McGroarty Park", "Equestrian-friendly streets", "Art & wellness programs"],
    demographics: "Families, retirees, creatives",
    atmosphere: "Quiet charm, community connection",
    avgHomePrice: "$850,000",
    medianAge: "42",
    keyFeatures: ["Historic charm", "Mountain views", "Community events", "Parks & trails"]
  },
  {
    id: "shadow-hills",
    name: "Shadow Hills",
    emoji: "🐴",
    population: "14,800",
    description: "Semi-rural atmosphere with deep equestrian tradition, offering wide streets and pastoral scenery.",
    image: "/image18.png",
    highlights: ["Equestrian trails", "Spanish-Colonial homes", "Ranch-style properties", "Film location friendly"],
    demographics: "Families, creatives, film crews",
    atmosphere: "Semi-rural, equestrian culture",
    avgHomePrice: "$1,200,000",
    medianAge: "38",
    keyFeatures: ["Equestrian lifestyle", "Large properties", "Rural feel", "Film industry"]
  },
  {
    id: "la-crescenta",
    name: "La Crescenta",
    emoji: "🏞",
    population: "19,148",
    description: "Family-oriented foothill enclave blending strong community atmosphere with tranquil canyon-edge lifestyle.",
    image: "/image17.png",
    highlights: ["Crescenta Valley High School", "Haines Canyon", "Cherry Canyon", "Los Angeles National Forest"],
    demographics: "Family-oriented, outdoor enthusiasts",
    atmosphere: "Tranquil, canyon-edge lifestyle",
    avgHomePrice: "$950,000",
    medianAge: "45",
    keyFeatures: ["Top schools", "Hiking trails", "Family-friendly", "Mountain access"]
  },
  {
    id: "altadena",
    name: "Altadena",
    emoji: "🌲",
    population: "43,000",
    description: "Nestled below the San Gabriel Mountains, embracing cultural richness with diverse architecture and neighborly spirit.",
    image: "/image11.png",
    highlights: ["Eaton Canyon", "Christmas Tree Lane", "Craftsman bungalows", "Art walks"],
    demographics: "Diverse mosaic, all ages",
    atmosphere: "Cultural richness, neighborly spirit",
    avgHomePrice: "$1,100,000",
    medianAge: "41",
    keyFeatures: ["Historic homes", "Cultural events", "Mountain trails", "Community traditions"]
  },
  {
    id: "nela",
    name: "Los Angeles",
    emoji: "🏙",
    population: "3,878,704",
    description: "Rich urban tapestry of multiple neighborhoods with cultural vibrancy and communal creativity.",
    image: "/image16.png",
    highlights: ["Occidental College", "Figueroa Street", "York Boulevard", "Art galleries"],
    demographics: "64% Latino, 17% White, 16% Asian",
    atmosphere: "Cultural vibrancy, communal creativity",
    avgHomePrice: "$780,000",
    medianAge: "35",
    keyFeatures: ["Cultural diversity", "Art scene", "Historic districts", "Urban amenities"]
  },
  {
    id: "sunland",
    name: "Sunland",
    emoji: "☀️",
    population: "21,588",
    description: "Laid-back, nature-rich neighborhood with peaceful streets and strong ties to outdoor living.",
    image: "/image13.png",
    highlights: ["La Tuna Canyon Park", "Angeles National Golf Club", "Verdugo Mountains", "Community events"],
    demographics: "Longtime residents, young families",
    atmosphere: "Laid-back, nature-rich, hidden gem",
    avgHomePrice: "$720,000",
    medianAge: "43",
    keyFeatures: ["Mountain trails", "Golf course", "Peaceful living", "Community spirit"]
  },
];

const communityStats = [
  { label: "Total Communities", value: "6", icon: MapPin },
  { label: "Combined Population", value: "365K+", icon: Users },
  { label: "Avg Home Price", value: "$950K", icon: Home },
  { label: "Mountain Access", value: "100%", icon: Mountain }
];

// Community involvement data
const communityInvolvement = [
  {
    id: "hope-gardens",
    name: "Hope Gardens",
    description: "Supporting families in transition through housing and community programs",
    icon: Heart,
  },
  {
    id: "wcr",
    name: "Women's Council of Realtors",
    description: "Professional development and networking for women in real estate",
    icon: Users,
  },
  {
    id: "festivals",
    name: "Local Events",
    description: "Participating in and supporting community celebrations and cultural events",
    icon: Calendar,
  },
];

export default function CommunitiesPage() {
  const router = useRouter();

  return (
    <main className="flex-1 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-grotesk font-bold text-gray-900 mb-4">
              Local <span className="bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent">Communities</span>
              </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the unique character and charm of our local communities. Each neighborhood offers its own distinct lifestyle, from mountain retreats to urban cultural hubs.
            </p>
            
            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-6 h-6 text-lime-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Communities Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {localCommunities.map((community) => (
              <Card key={community.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-lime-500 text-white text-xs px-2 py-1 rounded-full">
                    {community.population} residents
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {community.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {community.description}
                  </p>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{community.avgHomePrice}</div>
                      <div className="text-xs text-gray-600">Avg Home Price</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{community.medianAge}</div>
                      <div className="text-xs text-gray-600">Median Age</div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {community.keyFeatures.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                        ))}
                      </div>
                  </div>

                  {/* Demographics & Atmosphere */}
                  <div className="space-y-2 mb-4 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span>{community.demographics}</span>
                            </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-3 h-3" />
                      <span>{community.atmosphere}</span>
                        </div>
                      </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white"
                    onClick={() => {
                      if (community.id === 'tujunga') {
                        router.push('/communities/tujunga');
                      } else if (community.id === 'shadow-hills') {
                        router.push('/communities/shadow-hills');
                      } else if (community.id === 'la-crescenta') {
                        router.push('/communities/la-crescenta');
                      } else if (community.id === 'altadena') {
                        router.push('/communities/altadena');
                      } else if (community.id === 'nela') {
                        router.push('/communities/nela');
                      } else if (community.id === 'sunland') {
                        router.push('/communities/sunland');
                      } else {
                        router.push('/property-management');
                      }
                    }}
                  >
                    Explore Properties
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
                  </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-grotesk font-bold text-gray-900 mb-4">
              Community <span className="bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent">Involvement</span>
              </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              We're proud to be actively involved in our local communities through various initiatives and partnerships.
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityInvolvement.map((involvement) => {
                const IconComponent = involvement.icon;
                return (
                <Card key={involvement.id} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-lime-600" />
                    </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {involvement.name}
                    </h3>
                  <p className="text-sm text-gray-600">
                      {involvement.description}
                    </p>
                  </Card>
                );
              })}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-grotesk font-bold text-gray-900 mb-4">
            Ready to Find Your Community?
          </h2>
          <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you discover the perfect neighborhood that matches your lifestyle and investment goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/search')}
              className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white px-8 py-3"
            >
              Search Properties
            </Button>
            <Button
              onClick={() => router.push('/contact')}
              variant="outline"
              className="border-lime-500 text-lime-600 hover:bg-lime-50 px-8 py-3"
            >
              Get Local Insights
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
