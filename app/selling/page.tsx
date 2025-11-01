"use client";

import { Button } from "@/components/ui/button";
import {
  Clock,
  Target,
  DollarSign,
  CheckCircle,
  Handshake,
  ArrowRight,
  Calculator,
  Loader2,
  Home,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function SellingPage() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  useEffect(() => {
    // Función para cargar el widget de Homebot
    const loadHomebotWidget = () => {
      try {
        // Verificar si Homebot ya está disponible
        if ((window as any).Homebot) {
          (window as any).Homebot(
            "#homebot_homeowner_selling",
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
                "#homebot_homeowner_selling",
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
    <div className="min-h-screen bg-white">
      {/* Home Valuation Section */}
      <section className="pt-24 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-6xl font-grotesk font-bold text-gray-900 mb-20">
                Are you ready to sell your
                <span className="block text-lime-500">home?</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Get Your Free Home <span className="bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">Valuation</span>
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Enter your address below to receive an instant estimate of your home's current market value
              </p>
            </div>

            {/* Homebot Widget Container */}
            <div id="homebot_homeowner_selling" className="min-h-[200px] relative z-0 mb-4">
              {!widgetLoaded && !widgetError && (
                <div className="flex flex-col items-center justify-center h-[200px] text-gray-500">
                  <Loader2 className="w-8 h-8 animate-spin text-lime-600 mb-3" />
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
                    className="border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white"
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

            {/* Alternative Direct Link */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Prefer to use the direct Homebot link?
              </p>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-lime-600 text-lime-600 hover:bg-lime-600 hover:text-white"
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
          </div>
        </div>
      </section>

      {/* Why Choose Patron Section */}
      <section className="py-8 bg-gradient-to-r from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose <span className="bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">Patron Real Estate</span>?
              </h2>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                At Patron Real Estate Inc, we look to educate you first on all aspects of real estate. 
                We know how to sell your home. The question is, are you ready, well informed and prepared 
                to sell what may be your biggest asset and/or investment decision to date?
              </p>
              
              <p>
                Having 20 plus years of experience in the industry, Patron REI has gained a wealth of knowledge and wisdom. 
                One thing we have learned is that every situation is unique. We follow that approach with each new client 
                we meet and take the time to understand their big picture. We strongly believe in the principles of putting 
                our customer's best interest first!
              </p>

              <p>
                Selling your property can be a daunting and overwhelming process when not fully informed of all your options. 
                Your first step is to arm yourself with a team you can trust and will work on a plan that is <strong>RIGHT FOR YOU!</strong>
              </p>

              <p>
                The following steps or questions will provide you some of the basic information you are expected to encounter when starting 
                the home selling process. As mentioned, every situation is different. If you need additional or specific 
                information on this topic, please{" "}
                <Link href="/contact" className="text-lime-600 hover:text-lime-700 underline font-medium">
                  click here
                </Link>{" "}
                to get in contact with a Patron team member.
              </p>

              <div className="text-center mt-6">
                <p className="text-xl font-bold bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">
                  Put your trust in Patron REI!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Process Overview Section */}
      <section className="py-8 bg-gradient-to-r from-green-50 to-lime-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The starting <span className="bg-gradient-to-r from-lime-500 to-lime-600 bg-clip-text text-transparent">Point</span>:</h3>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                At this stage, we begin to gather information and understand your needs so we can begin to develop a strategy 
                that is <strong className="text-lime-600">RIGHT FOR YOU!</strong> The initial stage of getting to know each other is really the foundation 
                of how we build that structured approach to meet your needs. This also gives you the opportunity to interact 
                with a representative of Patron REI to help you decide if we are a right fit for you.
              </p>
            </div>

            <div className="space-y-8">
              {/* Time Frame Section */}
              <div className="flex items-start gap-6">
                <div className="w-4 h-4 bg-gradient-to-r from-lime-500 to-lime-600 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">What is your time-frame?</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    We need to understand if time is on your side or time is already working against you. Understanding 
                    how much time you have to get your home sold is very important. Are you starting a new job and relocating? 
                    Are you downsizing? Are you retiring? These are all different scenarios with different timeframes. 
                    In addition to that we need to consider market conditions and create a timeline that works for you and your goals.
                  </p>
                </div>
              </div>

              {/* Bottom Line Section */}
              <div className="flex items-start gap-6">
                <div className="w-4 h-4 bg-gradient-to-r from-lime-500 to-lime-600 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">What's your bottom Line?</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    We need to determine your strike price and your deal breakers. Are there any repairs in mind or 
                    options to explore to improve your home and optimize the value? By taking the time to understand 
                    and prepare yourself very early in the process, you will be able to make confident and favorable 
                    decisions. This also can help target the right buyers and reduce the back and forth that can happen 
                    between buyer and seller which happens during the offer{'>'}negotiation{'>'}acceptance stage of 
                    the selling process.
                  </p>
                </div>
              </div>

              {/* Setting the Price Section */}
              <div className="flex items-start gap-6">
                <div className="w-4 h-4 bg-gradient-to-r from-lime-500 to-lime-600 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Setting the price</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    This step is very important and must line up with your desired time-frame and bottom line deal 
                    breakers and financials to help reduce any obstacles or challenges that may negatively affect 
                    your timeframes to sell your home. As the homeowner, PATRON REI puts YOUR financials, priorities, 
                    immediate and longer-term goals as factors into the plan which play a key role in coming up with 
                    the price that is <strong>RIGHT FOR YOU!</strong>
                  </p>
                </div>
              </div>

              {/* Plan of Action Section */}
              <div className="flex items-start gap-6">
                <div className="w-4 h-4 bg-gradient-to-r from-lime-500 to-lime-600 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">A Plan of Action for YOU</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Now that we have covered your critical areas, we can begin to formulate a plan that will take into 
                    account all of the information we have discussed. We will work with you to lay out the steps and 
                    anticipated time frames. PATRON REI is confident that we can tailor a plan to meet your needs.
                  </p>
                </div>
              </div>

              {/* Partnership Section */}
              <div className="flex items-start gap-6">
                <div className="w-4 h-4 bg-gradient-to-r from-lime-500 to-lime-600 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Forming a Partnership….</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    We are committed to working diligently and meeting all the objectives set forth in the plan created 
                    just for YOU. If you agree with the plan, we ask that you commit to partnering with us on your 
                    real estate ventures. We will earn your business!!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-white/80 to-lime-50/80 backdrop-blur-sm rounded-2xl border border-lime-200/50">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                Patron Real Estate Inc's goal is to provide you information and share what we learned along our 20 plus 
                years of working in the industry. The experience has allowed Patron REI to gain valuable wisdom and knowledge. 
                We want to share what we know and help position you to protect your home and make well informed decisions 
                that best fits your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-8 bg-gradient-to-r from-lime-50 to-lime-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Ready to Start Your Selling Journey?</h3>
            <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
              Let our experienced team help you get the best value for your home.
            </p>
            <Button size="lg" className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-3 text-lg" asChild>
              <Link href="/contact">
                Contact Us Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
