"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function BrokerCard() {
  const handleScheduleShowing = () => {
    // Navigate to contact page or scroll to contact section
    window.location.href = "/contact";
  };

  return (
    <Card className="buyers-poc-broker-card">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center">
          <Button
            onClick={handleScheduleShowing}
            className="w-full bg-lime-500 hover:bg-lime-600 text-white mb-4"
          >
            Schedule a showing
          </Button>
          <img
            src="https://patronrealestateservices.com/fabiola-patron-updated.jpg"
            alt="Fabiola Patron"
            className="w-full max-w-[200px] object-cover mt-3"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/fabiola-patron-updated.jpg";
            }}
          />
          <h2 className="font-medium mt-3 text-gray-900">Broker</h2>
          <p className="font-medium mt-3 text-gray-700">Phone Number: (323) 350-3137</p>
        </div>
      </CardContent>
    </Card>
  );
}

