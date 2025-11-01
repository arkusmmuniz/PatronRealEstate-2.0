"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Star,
  Send,
  Home,
  Calendar,
  DollarSign,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    contactMethod: "email",
    visitTime: "",
    financing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 border-2 border-lime-200">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-lime-200">
              <MessageCircle className="w-8 h-8 text-lime-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Message Sent Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest! Fabiola will contact you within 24
              hours.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-lime-500 hover:bg-lime-600"
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="w-full border-2 border-lime-500 text-lime-600 hover:bg-lime-500 hover:text-white"
              >
                Send Another Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lime-50 to-white py-12 md:py-16 mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Contact
              <span className="block text-lime-600">Fabiola Patron</span>
            </h1>
            <div className="w-24 h-1 bg-lime-500 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to start your real estate journey? Get in touch with Fabiola
              for personalized guidance and expert advice on buying, selling, or
              investing in Greater Los Angeles.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Formulario de contacto */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border-2 border-lime-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Contact Fabiola Patron
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and Fabiola will get back to you
                    within 24 hours.
                  </p>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Información personal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Preferencias de contacto */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Preferred Contact Method</Label>
                        <Select
                          value={formData.contactMethod}
                          onValueChange={(value) =>
                            handleInputChange("contactMethod", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone Call</SelectItem>
                            <SelectItem value="text">Text Message</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="visitTime">Preferred Visit Time</Label>
                        <Select
                          value={formData.visitTime}
                          onValueChange={(value) =>
                            handleInputChange("visitTime", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">
                              Morning (9am - 12pm)
                            </SelectItem>
                            <SelectItem value="afternoon">
                              Afternoon (12pm - 5pm)
                            </SelectItem>
                            <SelectItem value="evening">
                              Evening (5pm - 8pm)
                            </SelectItem>
                            <SelectItem value="weekend">Weekend</SelectItem>
                            <SelectItem value="flexible">
                              I'm flexible
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="Please tell us more about what you're looking for..."
                      />
                    </div>

                    {/* Opciones adicionales */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="financing"
                          checked={formData.financing}
                          onCheckedChange={(checked) =>
                            handleInputChange("financing", checked)
                          }
                        />
                        <Label htmlFor="financing" className="text-sm">
                          I need help with financing options
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" />
                        <Label htmlFor="newsletter" className="text-sm">
                          Subscribe to our newsletter for market updates
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-lime-500 hover:bg-lime-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar derecho - Foto y botones de contacto */}
            <div>
              <Card className="border-2 border-lime-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <Star className="w-5 h-5 text-lime-600 mr-2" />
                    Fabiola Patron
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Broker/Owner - Patron Real Estate Inc.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Foto y información básica */}
                  <div className="text-center">
                    <div className="relative w-32 h-40 mx-auto mb-4 rounded-lg overflow-hidden">
                      <Image
                        src="/fabiola-patron-updated.jpg"
                        alt="Fabiola Patron"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-lg">Fabiola Patron</h4>
                    <div className="flex items-center justify-center text-sm text-gray-600 mt-2">
                      <Star className="w-4 h-4 text-lime-600 mr-1" />
                      5.0 (20+ years experience)
                    </div>
                  </div>

                  <Separator />

                  {/* Botones de contacto directo */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-lime-500 hover:bg-lime-600"
                      asChild
                    >
                      <a href="tel:3233503137">
                        <Phone className="w-4 h-4 mr-2" />
                        Call (323) 350-3137
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-2 border-lime-500 text-lime-600 hover:bg-lime-500 hover:text-white"
                      asChild
                    >
                      <a href="sms:3233503137">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Text (323) 350-3137
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-2 border-lime-500 text-lime-600 hover:bg-lime-500 hover:text-white"
                      asChild
                    >
                      <a href="mailto:patronrealestateservices@gmail.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                  </div>

                  <Separator />

                  {/* Dirección */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border-2 border-lime-200">
                      <MapPin className="w-4 h-4 text-lime-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        10209 Tujunga Canyon Blvd #164
                      </h4>
                      <p className="text-sm text-gray-600">Tujunga, CA 91042</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sección Why Choose Fabiola - Distribuida horizontalmente */}
          <Card className="border-2 border-lime-200">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Star className="w-5 h-5 text-lime-600 mr-2" />
                Why Choose Fabiola?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200">
                    <span className="text-lime-600 font-semibold text-sm">
                      1
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      20+ Years Experience
                    </h4>
                    <p className="text-sm text-gray-600">
                      Extensive real estate expertise
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200">
                    <span className="text-lime-600 font-semibold text-sm">
                      2
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Licensed Broker & Owner
                    </h4>
                    <p className="text-sm text-gray-600">
                      Professional credentials
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200">
                    <span className="text-lime-600 font-semibold text-sm">
                      3
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Greater LA Specialist
                    </h4>
                    <p className="text-sm text-gray-600">
                      Local market knowledge
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200">
                    <span className="text-lime-600 font-semibold text-sm">
                      4
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Customer-First Approach
                    </h4>
                    <p className="text-sm text-gray-600">
                      Your needs come first
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-lime-200">
                    <span className="text-lime-600 font-semibold text-sm">
                      5
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Free Market Analysis
                    </h4>
                    <p className="text-sm text-gray-600">
                      Professional insights
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
