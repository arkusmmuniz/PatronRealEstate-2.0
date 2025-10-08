"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  MapPin,
  Mountain,
  TreePine,
  Building2,
  Heart,
  Star,
  Calendar,
  Users2,
  Palette,
} from "lucide-react";

// Community interface
interface LocalCommunity {
  id: string;
  name: string;
  emoji: string;
  population: number;
  description: string;
  image?: string;
  images?: string[];
  highlights: string[];
  demographics: string;
  atmosphere: string;
}

// Local community data
const localCommunities: LocalCommunity[] = [
  {
    id: "tujunga",
    name: "Tujunga",
    emoji: "🌄",
    population: 27000,
    description:
      "Tujunga's population centers around 27,000, creating a tight-knit community nestled in the foothills. With median age slightly higher, it draws families, retirees, and creatives seeking quiet charm. Tujunga's past as an early 20th-century cooperative colony is visible at Bolton Hall, now a history museum. The area includes McGroarty and Little Landers parks, known for hosting art, gardening, and wellness programs. While retaining pastoral origins and equestrian-friendly streets, Tujunga's spirit is rooted in community connection.",
    image: "/image3.png",
    highlights: [
      "Bolton Hall Museum",
      "McGroarty Park",
      "Little Landers Park",
      "Equestrian-friendly streets",
    ],
    demographics: "Families, retirees, creatives",
    atmosphere: "Quiet charm, community connection",
  },
  {
    id: "shadow-hills",
    name: "Shadow Hills",
    emoji: "🐴",
    population: 13000,
    description:
      "With a population of roughly 13,000, Shadow Hills offers a semi-rural atmosphere inside city limits. Rooted in equestrian tradition, many properties include stables and riding trails. Architecturally, homes vary from Spanish-Colonial and Ranch to Mid‑Century designs and rustic cabins. The wide streets, open spaces, and equine culture draw families, creatives, and film crews seeking pastoral scenery. Shadow Hills' geography is dominated by large yards, horses, and a deep sense of serenity.",
    image: "/image18.png",
    highlights: [
      "Equestrian trails",
      "Spanish-Colonial homes",
      "Ranch-style properties",
      "Film location friendly",
    ],
    demographics: "Families, creatives, film crews",
    atmosphere: "Semi-rural, equestrian culture",
  },
  {
    id: "la-crescenta",
    name: "La Crescenta",
    emoji: "🏞",
    population: 17000,
    description:
      "This foothill enclave supports approximately 17,000 people. Predominantly family-oriented, La Crescenta blends a strong community atmosphere with a tranquil, canyon-edge lifestyle. The downtown area is anchored by Crescenta Valley High School, cafes, boutiques, and a historic library. Outdoor enthusiasts frequent nearby natural attractions including Haines Canyon, Cherry Canyon, and various trail systems within the Los Angeles National Forest.",
    image: "/image17.png",
    highlights: [
      "Crescenta Valley High School",
      "Haines Canyon",
      "Cherry Canyon",
      "Los Angeles National Forest",
    ],
    demographics: "Family-oriented, outdoor enthusiasts",
    atmosphere: "Tranquil, canyon-edge lifestyle",
  },
  {
    id: "altadena",
    name: "Altadena",
    emoji: "🌄",
    population: 43000,
    description:
      "Nestled below the San Gabriel Mountains, Altadena is home to around 43,000 residents. The community embraces cultural richness, with a diverse mosaic of ages and backgrounds. Known for Craftsman bungalows, Spanish haciendas, Mid‑Century Modern homes, and modern infill, the architecture mirrors the eclectic spirit of its people. Visitors and residents cherish Eaton Canyon and Rancho San Antonio, offering miles of hiking trails, waterfalls, and weekend art walks. Seasonal events such as Christmas Tree Lane, a holiday tradition since the 1920s, highlight Altadena's neighborly spirit.",
    image: "/image11.png",
    highlights: [
      "Eaton Canyon",
      "Rancho San Antonio",
      "Christmas Tree Lane",
      "Craftsman bungalows",
    ],
    demographics: "Diverse mosaic, all ages",
    atmosphere: "Cultural richness, neighborly spirit",
  },
  {
    id: "nela",
    name: "Northeast Los Angeles (NELA)",
    emoji: "🏙",
    population: 244000,
    description:
      "NELA is a rich urban tapestry of multiple neighborhoods with a combined population near 244,000. Ethnically diverse (roughly 64% Latino, 17% White, 16% Asian), it spans ages and incomes. Canoe-shaped neighborhoods like Highland Park, Eagle Rock, and Cypress Park are connected by cultural vibrancy. Major community anchors include Occidental College (Eagle Rock), Figueroa Street and York Boulevard cultural districts, and murals and parks that dot the landscape. Dozens of new, independent cafés, galleries, brewpubs, and festivals like Highland Park's Day of the Dead and Eagle Rock's Art Walk emphasize the area's communal creativity.",
    images: ["/image16.png", "/image2.png"],
    highlights: [
      "Occidental College",
      "Figueroa Street",
      "York Boulevard",
      "Highland Park Day of the Dead",
    ],
    demographics: "64% Latino, 17% White, 16% Asian",
    atmosphere: "Cultural vibrancy, communal creativity",
  },
  {
    id: "sunland",
    name: "Sunland",
    emoji: "☀️",
    population: 21000,
    description:
      "Sunland is a laid-back, nature-rich neighborhood tucked into the foothills of the Verdugo Mountains in Northeast Los Angeles. With a population of approximately 21,000, it's known for its peaceful residential streets, friendly atmosphere, and strong ties to outdoor living. The area attracts a mix of longtime residents, young families, and those drawn to the rustic charm of hillside living with city access. Demographically, Sunland is diverse and predominantly residential. The community features a blend of single-family households and multigenerational homes. English and Spanish are widely spoken, and residents range in profession from tradespeople and educators to creatives and small business owners. One of Sunland's most beloved assets is La Tuna Canyon Park, which offers miles of hiking and mountain biking trails with sweeping views of the San Fernando Valley. The nearby Angeles National Golf Club, nestled against the mountains, draws golfers from all over the region. For everyday leisure, residents enjoy neighborhood parks, community events, and casual hangouts at local cafés, family-owned restaurants, and the Sunland-Tujunga Branch Library. With its quiet ambiance, friendly neighbors, and easy access to both nature and the city, Sunland remains one of Los Angeles' hidden gems for those seeking balance and beauty in daily life.",
    image: "/image13.png",
    highlights: [
      "La Tuna Canyon Park",
      "Angeles National Golf Club",
      "Sunland-Tujunga Branch Library",
      "Verdugo Mountains",
    ],
    demographics: "Longtime residents, young families, diverse professionals",
    atmosphere: "Laid-back, nature-rich, hidden gem",
  },
];

// Community involvement data
const communityInvolvement = [
  {
    id: "hope-gardens",
    name: "Hope Gardens",
    description:
      "Supporting families in transition through housing and community programs",
    icon: Heart,
    color: "text-lime-600",
  },
  {
    id: "wcr",
    name: "Women's Council of Realtors (WCR)",
    description:
      "Professional development and networking for women in real estate",
    icon: Users2,
    color: "text-lime-600",
  },
  {
    id: "festivals",
    name: "Local Festivals & Events",
    description:
      "Participating in and supporting community celebrations and cultural events",
    icon: Calendar,
    color: "text-lime-600",
  },
];

export default function CommunitiesPage() {
  const [activeTab, setActiveTab] = useState("tujunga");

  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lime-50 to-white py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
                Local Communities
              </h1>
              <div className="w-24 h-1 bg-lime-500 mx-auto mb-4"></div>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover the unique character and charm of our local communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Tabs Section */}
      <section className="py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
                {localCommunities.map((community) => (
                  <TabsTrigger
                    key={community.id}
                    value={community.id}
                    className="flex flex-col items-center space-y-2 p-4 text-sm"
                  >
                    <span className="text-2xl">{community.emoji}</span>
                    <span className="font-medium">{community.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {localCommunities.map((community) => (
                <TabsContent
                  key={community.id}
                  value={community.id}
                  className="space-y-8 cursor-default pt-8"
                >
                  {/* Community Header */}
                  <div className="text-center mb-12">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <span className="text-4xl">{community.emoji}</span>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        {community.name}
                      </h2>
                    </div>
                    <div className="flex items-center justify-center space-x-6 text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>
                          {community.population.toLocaleString()} residents
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Community Image(s) */}
                  <div className="space-y-8 mt-12">
                    {community.images ? (
                      // Multiple images for NELA
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {community.images.map((image, index) => (
                          <div
                            key={index}
                            className="relative rounded-lg overflow-hidden shadow-lg"
                          >
                            <img
                              src={image}
                              alt={`${community.name} community - ${index + 1}`}
                              className="w-full h-auto max-h-96 object-contain cursor-default"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Single image for other communities
                      <div className="relative rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={community.image}
                          alt={`${community.name} community`}
                          className="w-full h-auto max-h-96 object-contain cursor-default"
                        />
                      </div>
                    )}
                  </div>

                  {/* Community Description */}
                  <Card className="p-8 cursor-default">
                    <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                      {community.description}
                    </p>

                    {/* Community Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Star className="w-5 h-5 mr-2 text-lime-600" />
                          Community Highlights
                        </h3>
                        <div className="space-y-2">
                          {community.highlights.map((highlight, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-2 h-2 bg-lime-600 rounded-full"></div>
                              <span className="text-muted-foreground">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Users className="w-5 h-5 mr-2 text-lime-600" />
                          Community Profile
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-foreground">
                              Demographics:
                            </span>
                            <p className="text-muted-foreground">
                              {community.demographics}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-foreground">
                              Atmosphere:
                            </span>
                            <p className="text-muted-foreground">
                              {community.atmosphere}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Community Involvement Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Community Involvement
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're proud to be actively involved in our local communities
                through various initiatives and partnerships
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {communityInvolvement.map((involvement) => {
                const IconComponent = involvement.icon;
                return (
                  <Card
                    key={involvement.id}
                    className="p-8 text-center hover:shadow-lg transition-shadow bg-white border-2 border-lime-200"
                  >
                    <div
                      className={`w-16 h-16 border-2 border-lime-300 bg-white rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      <IconComponent className="w-8 h-8 text-lime-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      {involvement.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {involvement.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
