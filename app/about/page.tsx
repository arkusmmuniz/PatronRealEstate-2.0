import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Award,
  MapPin,
  Phone,
  Mail,
  Target,
  Heart,
  Shield,
  Star,
  TrendingUp,
  GraduationCap,
  Home,
  Wrench,
  Handshake,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lime-50 to-white py-16 md:py-20 mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              About
              <span className="block text-lime-600">
                Patron Real Estate Inc.
              </span>
            </h1>
            <div className="w-24 h-1 bg-lime-500 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet Fabiola Patron, broker/owner of Patron REI, with 20 years of
              real estate expertise serving the Greater Los Angeles area. We
              focus on putting the customer first with the highest degree of
              integrity and standards.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Fabiola's Story Section */}
        <Card className="bg-white shadow-lg border-2 border-lime-200 mb-12">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl">
              <Building2 className="w-6 h-6 md:w-8 md:h-8 text-lime-600" />
              Meet Fabiola Patron
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Broker/Owner of Patron Real Estate Inc.
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Hello, I am excited to introduce Patron Real Estate Inc. to
                    you! My name is Fabiola Patron, the broker/owner of Patron
                    REI. My journey in real estate started 20 years ago with
                    Century 21 where I spent 13 years serving Eagle Rock CA and
                    the surrounding North East LA communities.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    I then went to another Century 21 office in Arcadia where I
                    served the foothill communities and most recently was at
                    Keller Williams Realty in La Canada, where I continued to
                    serve the foothill communities.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    I have a Bachelors in business from Pepperdine University
                    and a passion for real estate. I have gained invaluable
                    knowledge and a great understanding of how the real estate
                    industry works throughout my career.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Patron REI will continue to focus on putting the customer
                    first! and hold ourselves to the highest degree of integrity
                    and standards. At Patron REI, you will experience
                    transparency, clear communication and the results we strive
                    to provide to our customers and partners.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-lime-50 to-lime-100 p-6 rounded-lg border-2 border-lime-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-lime-600 mb-2">
                        20+
                      </div>
                      <div className="text-sm text-gray-600">
                        Years of Experience
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-lime-600 mb-2">
                        13
                      </div>
                      <div className="text-sm text-gray-600">
                        Years at Century 21
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-lime-600 mb-2">
                        BA
                      </div>
                      <div className="text-sm text-gray-600">
                        Business Degree
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-lime-600 mb-2">
                        <GraduationCap className="w-6 h-6 md:w-8 md:h-8 mx-auto" />
                      </div>
                      <div className="text-sm text-gray-600">
                        Pepperdine University
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement Section */}
        <Card className="bg-white shadow-lg border-2 border-lime-200 mb-12">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl">
              <Target className="w-6 h-6 md:w-8 md:h-8 text-lime-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                <strong>Putting the Customer First</strong> with the highest
                degree of integrity and standards. At Patron REI, you will
                experience transparency, clear communication and the results we
                strive to provide to our customers and partners.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Please feel free to reach out anytime with any questions – My
                team would love to partner with you on any and all your real
                estate needs.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Services Section */}
        <Card className="bg-white shadow-lg border-2 border-lime-200 mb-12">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl">
              <Home className="w-6 h-6 md:w-8 md:h-8 text-lime-600" />
              Our Services
            </CardTitle>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive real estate services tailored to meet all your
              property needs.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg border-2 border-lime-200">
                <div className="w-14 h-14 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Selling</h4>
                <p className="text-sm text-gray-600">
                  Expert guidance through the entire selling process with proven
                  strategies.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg border-2 border-lime-200">
                <div className="w-14 h-14 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Buying</h4>
                <p className="text-sm text-gray-600">
                  Find your perfect home with our comprehensive buying services.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg border-2 border-lime-200">
                <div className="w-14 h-14 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Investing</h4>
                <p className="text-sm text-gray-600">
                  Strategic investment opportunities with expert market
                  analysis.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg border-2 border-lime-200">
                <div className="w-14 h-14 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Renting</h4>
                <p className="text-sm text-gray-600">
                  Professional rental services for both tenants and property
                  owners.
                </p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg border-2 border-lime-200">
                <div className="w-14 h-14 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Property Management</h4>
                <p className="text-sm text-gray-600">
                  Professional rental management for landlords and property owners.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Section */}
        <Card className="bg-white shadow-lg border-2 border-lime-200 mb-12">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl">
              <Wrench className="w-6 h-6 md:w-8 md:h-8 text-lime-600" />
              Professional Referrals
            </CardTitle>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We can connect you with trusted professional service providers in our network. 
              These are referrals to independent contractors and specialists, not services we provide directly.
            </p>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="text-center p-4 bg-lime-50 rounded-lg border-2 border-lime-200">
                  <div className="w-12 h-12 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Handymen
                  </span>
                </div>
                <div className="text-center p-4 bg-lime-50 rounded-lg border-2 border-lime-200">
                  <div className="w-12 h-12 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Contractors
                  </span>
                </div>
                <div className="text-center p-4 bg-lime-50 rounded-lg border-2 border-lime-200">
                  <div className="w-12 h-12 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Electrical
                  </span>
                </div>
                <div className="text-center p-4 bg-lime-50 rounded-lg border-2 border-lime-200">
                  <div className="w-12 h-12 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Painters
                  </span>
                </div>
                <div className="text-center p-4 bg-lime-50 rounded-lg border-2 border-lime-200">
                  <div className="w-12 h-12 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Landscaping
                  </span>
                </div>
                <div className="text-center p-4 bg-lime-50 rounded-lg border-2 border-lime-200">
                  <div className="w-12 h-12 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Pest Control
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Values Section */}
        <Card className="bg-white shadow-lg border-2 border-lime-200 mb-12">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 text-2xl md:text-3xl">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-lime-600" />
              Our Core Values
            </CardTitle>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The fundamental principles that guide everything we do and shape
              our relationships.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg border-2 border-lime-200">
                <div className="w-14 h-14 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Customer First
                </h4>
                <p className="text-sm text-gray-600">
                  Your needs and satisfaction are our top priority in every
                  decision we make.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg border-2 border-lime-200">
                <div className="w-14 h-14 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Integrity</h4>
                <p className="text-sm text-gray-600">
                  We conduct business with honesty, transparency, and the
                  highest ethical standards.
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-lg border-2 border-lime-200">
                <div className="w-14 h-14 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
                <p className="text-sm text-gray-600">
                  We strive for the highest quality in every service and client
                  interaction.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-white shadow-lg border-2 border-lime-200 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Handshake className="w-6 h-6 text-lime-600" />
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-lime-600" />
                    <span className="text-gray-600">323.350.3137</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-lime-600" />
                    <span className="text-gray-600">
                      patronrealestateservices@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-lime-600" />
                    <span className="text-gray-600">
                      Serving Greater Los Angeles
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Ready to Connect?
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  If you need additional or specific information, please{" "}
                  <Link
                    href="/contact"
                    className="text-lime-600 hover:text-lime-700 underline font-medium"
                  >
                    click here
                  </Link>{" "}
                  to get in contact with a Patron team member. We look forward
                  to connecting with you!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
