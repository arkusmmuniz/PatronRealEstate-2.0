"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calculator,
  Home,
  TrendingUp,
  MapPin,
  DollarSign,
  Calendar,
  BarChart3,
  CheckCircle,
  Star,
  Shield,
  Loader2,
  Users,
  Target,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeValuePage() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  useEffect(() => {
    // Función para cargar el widget de Homebot
    const loadHomebotWidget = () => {
      try {
        // Verificar si Homebot ya está disponible
        if ((window as any).Homebot) {
          (window as any).Homebot(
            "#homebot_homeowner",
            "6172d27b4c8835f47f7692e42c2fe8296fbc5631fff6439c"
          );
          setWidgetLoaded(true);
          return;
        }

        // Si no está disponible, cargar el script
        const script = document.createElement("script");
        script.src = "https://embed.homebotapp.com/lgw/v1/widget.js";
        script.async = true;

        script.onload = () => {
          // Esperar un poco para que Homebot se inicialice
          setTimeout(() => {
            if ((window as any).Homebot) {
              (window as any).Homebot(
                "#homebot_homeowner",
                "6172d27b4c8835f47f7692e42c2fe8296fbc5631fff6439c"
              );
              setWidgetLoaded(true);
            } else {
              setWidgetError(true);
            }
          }, 1000);
        };

        script.onerror = () => {
          setWidgetError(true);
        };

        document.head.appendChild(script);

        // Timeout de seguridad
        setTimeout(() => {
          if (!widgetLoaded) {
            setWidgetError(true);
          }
        }, 10000);
      } catch (error) {
        console.error("Error loading Homebot widget:", error);
        setWidgetError(true);
      }
    };

    // Cargar el widget cuando el componente se monte
    loadHomebotWidget();
  }, [widgetLoaded]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 relative z-0">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-grotesk font-bold text-gray-900 mb-4">
            My Home
            <span className="block text-green-600">Value</span>
          </h1>
        </div>

        {/* Homebot Widget Integration - Moved to top */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-white shadow-xl border border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Calculator className="w-8 h-8 text-green-600" />
                Professional Home Valuation
              </CardTitle>
              <p className="text-gray-600">
                Powered by Homebot - The most accurate home valuation technology
              </p>
            </CardHeader>
            <CardContent>
              {/* Homebot Widget Container */}
              <div
                id="homebot_homeowner"
                className="min-h-[200px] relative z-0"
              >
                {!widgetLoaded && !widgetError && (
                  <div className="flex flex-col items-center justify-center h-[200px] text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin text-green-600 mb-3" />
                    <p className="text-base">Loading Homebot Widget...</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Please wait while we load the valuation tool
                    </p>
                  </div>
                )}

                {widgetError && (
                  <div className="flex flex-col items-center justify-center h-[200px] text-gray-500">
                    <Calculator className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-base text-gray-600 mb-2">
                      Widget Loading Issue
                    </p>
                    <p className="text-xs text-gray-400 mb-3 text-center">
                      There was an issue loading the Homebot widget. Please use
                      the direct link below.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                      <a
                        href="https://hmbt.co/aypqLM"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Use Direct Homebot Link
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Intro Statement - Moved below the widget */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardContent className="p-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                As part of <strong>PATRON's</strong> quest to provide homeowners
                with resources and knowledge, we would like to provide you with
                a <strong>FREE, no obligation</strong> tool that empowers
                homeowners with personalized home finance insights and
                facilitates engagement with the experts that can help you manage
                your home asset.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                By signing up, each month, you will receive a personalized
                report that tracks your home value, mortgages and market
                conditions. You will also receive advice about when to buy or
                sell your home, when to refinance, when to drop your mortgage
                insurance, how to save by strategically paying your principal
                payments, and even how much you could make if you are interested
                in making a "move".
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Take advantage of this free, homeownership tool provided to you
                with no obligation. Give it a try. Simply type in your home
                address and get a sneak peek. If you like what you see, you just
                need to provide your email address to start receiving your
                monthly updates. You can unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Direct Link */}
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-4">
            Prefer to use the direct Homebot link?
          </p>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            <a
              href="https://hmbt.co/aypqLM"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Open Homebot Valuation Tool
            </a>
          </Button>
        </div>

        {/* Powered by Homebot Section */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 mb-4">Powered by homebot</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Here is an example. See how Molly is strengthening her position in
            the real estate market. Some pretty cool stuff to stay up to date in
            this crazy market!
          </p>

          {/* Homebot Flow Images */}
          <div className="max-w-4xl mx-auto space-y-6">
            <img
              src="https://patronrealestateservices.com/wp-content/uploads/2022/09/home_value_1-1024x471.png"
              alt="Home Value Flow 1"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src="https://patronrealestateservices.com/wp-content/uploads/2022/09/home_value_2-1024x347.png"
              alt="Home Value Flow 2"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src="https://patronrealestateservices.com/wp-content/uploads/2022/09/home_value_3-1024x386.png"
              alt="Home Value Flow 3"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src="https://patronrealestateservices.com/wp-content/uploads/2022/09/home_value_4-1024x387.png"
              alt="Home Value Flow 4"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src="https://patronrealestateservices.com/wp-content/uploads/2022/09/home_value_5-1024x383.png"
              alt="Home Value Flow 5"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src="https://patronrealestateservices.com/wp-content/uploads/2022/09/home_value_6-1024x335.png"
              alt="Home Value Flow 6"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <img
              src="https://patronrealestateservices.com/wp-content/uploads/2022/09/home_value_7-1024x379.png"
              alt="Home Value Flow 7"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-8">
            If you have any questions or require additional information, please{" "}
            <Link
              href="/contact"
              className="text-green-600 hover:text-green-700 underline font-medium"
            >
              click here
            </Link>{" "}
            to get in contact with a Patron Real Estate Team Member. We look
            forward to helping you increase your knowledge and grow your wealth.
          </p>
        </div>
      </div>
    </div>
  );
}
