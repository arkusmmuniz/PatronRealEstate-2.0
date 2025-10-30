"use client";

import { useEffect, useRef, useState } from "react";

interface IDXBrokerQuickSearchWidgetProps {
  className?: string;
}

export function IDXBrokerQuickSearchWidget({ className = "" }: IDXBrokerQuickSearchWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Load IDXBroker Quick Search widget only on client side
    if (typeof window !== 'undefined' && widgetRef.current) {
      const loadWidget = () => {
        if (!widgetRef.current) return;
        
        // Remove any existing script with the same ID
        const existingScript = document.getElementById('idxwidgetsrc-47697');
        if (existingScript) {
          existingScript.remove();
        }
        
        const script = document.createElement('script');
        script.charSet = 'UTF-8';
        script.type = 'text/javascript';
        script.id = 'idxwidgetsrc-47697';
        script.src = 'https://patronrealestateservices.idxbroker.com/idx/quicksearchjs.php?widgetid=47697';
        
        // Handle script load events
        script.onload = () => {
          setIsLoading(false);
          setHasError(false);
          console.log('IDXBroker Quick Search widget loaded successfully');
        };
        
        script.onerror = (error) => {
          setIsLoading(false);
          setHasError(true);
          console.error('Failed to load IDXBroker Quick Search widget:', error);
        };
        
        // Clear any existing content
        widgetRef.current.innerHTML = '';
        
        // Append the script to the widget container
        widgetRef.current.appendChild(script);
      };
      
      // Load immediately
      loadWidget();
      
      return () => {
        const script = document.getElementById('idxwidgetsrc-47697');
        if (script) {
          script.remove();
        }
      };
    }
  }, []);

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
        Quick Search
      </h2>
      
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Cargando búsqueda rápida...</span>
        </div>
      )}
      
      {hasError && (
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600">No se pudo cargar el widget de búsqueda rápida</p>
          <p className="text-sm text-gray-500 mt-1">Intenta recargar la página</p>
        </div>
      )}
      
      <div className="w-full idx-quicksearch-widget" ref={widgetRef}>
        {/* Widget will be loaded here by useEffect */}
      </div>
      
      <style jsx global>{`
        .idx-quicksearch-widget {
          min-height: 200px;
        }
        .idx-quicksearch-widget form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .idx-quicksearch-widget input,
        .idx-quicksearch-widget select {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 1rem;
        }
        .idx-quicksearch-widget button {
          background-color: #059669;
          color: white;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.375rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .idx-quicksearch-widget button:hover {
          background-color: #047857;
        }
        @media (min-width: 768px) {
          .idx-quicksearch-widget form {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: end;
          }
          .idx-quicksearch-widget input,
          .idx-quicksearch-widget select {
            flex: 1;
            min-width: 200px;
          }
        }
      `}</style>
    </div>
  );
}
