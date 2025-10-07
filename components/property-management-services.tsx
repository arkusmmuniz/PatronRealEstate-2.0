import { Card, CardContent } from "@/components/ui/card"
import { Users, CreditCard, Wrench, FileText, Search, Shield } from "lucide-react"

const managementServices = [
  {
    title: "Tenant Screening & Placement",
    description: "Find qualified tenants through comprehensive background checks and credit screening.",
    icon: Users,
    features: [
      "Credit and background checks",
      "Employment verification",
      "Previous landlord references",
      "Professional marketing and showings",
    ],
  },
  {
    title: "Maintenance & Repairs",
    description: "24/7 maintenance coordination with vetted contractors and emergency response.",
    icon: Wrench,
    features: [
      "24/7 emergency maintenance hotline",
      "Network of licensed contractors",
      "Preventive maintenance programs",
      "Detailed repair documentation",
    ],
  },
  {
    title: "Legal Compliance & Documentation",
    description: "Stay compliant with all local and state regulations with proper documentation.",
    icon: FileText,
    features: [
      "Lease agreement preparation",
      "Eviction process management",
      "Regulatory compliance monitoring",
      "Legal document management",
    ],
  },
  {
    title: "Property Marketing & Advertising",
    description: "Professional marketing to minimize vacancy and attract quality tenants.",
    icon: Search,
    features: [
      "Professional photography",
      "Multi-platform listing distribution",
      "Virtual tours and showings",
      "Competitive market analysis",
    ],
  },
  {
    title: "Insurance & Risk Management",
    description: "Protect your investment with comprehensive insurance and risk assessment.",
    icon: Shield,
    features: [
      "Property insurance coordination",
      "Liability protection guidance",
      "Regular property inspections",
      "Risk assessment and mitigation",
    ],
  },
]

export function PropertyManagementServices() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Property Management Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From tenant placement to maintenance coordination, we handle every aspect of your rental property
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {managementServices.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">{service.title}</h3>
                  </div>

                  <p className="text-muted-foreground mb-4 flex-1">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
