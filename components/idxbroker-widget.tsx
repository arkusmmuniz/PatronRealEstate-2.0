"use client";

import { useEffect, useRef, useState } from "react";
import { IDXBrokerImageHandler } from "./idxbroker-image-handler";

interface IDXBrokerWidgetProps {
  widgetId: string;
  title: string;
  className?: string;
}

export function IDXBrokerWidget({ widgetId, title, className = "" }: IDXBrokerWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useIframe, setUseIframe] = useState(false);

  useEffect(() => {
    // Load IDXBroker widget only on client side
    if (typeof window !== 'undefined' && widgetRef.current) {
      // Set up global error handler for widget-related errors
      const handleGlobalError = (event: ErrorEvent) => {
        if (event.filename && event.filename.includes('idxbroker')) {
          console.warn('IDXBroker widget error caught:', event.message);
          event.preventDefault();
          return false;
        }
      };

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        if (event.reason && typeof event.reason === 'string' && event.reason.includes('idxbroker')) {
          console.warn('IDXBroker widget promise rejection caught:', event.reason);
          event.preventDefault();
          return false;
        }
      };

      window.addEventListener('error', handleGlobalError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);

      const loadWidget = () => {
        if (!widgetRef.current) return;
        
        // Remove any existing script with the same ID
        const existingScript = document.getElementById(`idxwidgetsrc-${widgetId}`);
        if (existingScript) {
          existingScript.remove();
        }
        
        const script = document.createElement('script');
        script.charSet = 'UTF-8';
        script.type = 'text/javascript';
        script.id = `idxwidgetsrc-${widgetId}`;
        script.src = `https://patronrealestateservices.idxbroker.com/idx/widgets/${widgetId}`;
        
        // Handle script load events
        script.onload = () => {
          try {
            setIsLoading(false);
            setHasError(false);
            console.log(`IDXBroker widget ${widgetId} loaded successfully`);
            
            // Fix image sources after widget loads
            setTimeout(() => {
              if (widgetRef.current) {
                const images = widgetRef.current.querySelectorAll('img');
                images.forEach((img) => {
                  if (img.src && (
                    img.src.includes('idxbroker.com') || 
                    img.src.includes('patronrealestateservices.com') ||
                    img.src.includes('api-trestle.corelogic.com') ||
                    img.src.includes('trestle.corelogic.com')
                  )) {
                    // Check if we're on IDXBroker Integration page - use direct URLs
                    const isIDXPage = window.location.pathname.includes('/idxbroker-integration');
                    
                    if (isIDXPage) {
                      // On IDXBroker Integration page, use direct URLs without proxy
                      img.src = img.src.replace('http://', 'https://');
                    } else {
                      // On other pages, use proxy for problematic domains
                      const needsProxy = img.src.includes('api-trestle.corelogic.com') || 
                                       img.src.includes('trestle.corelogic.com');
                      
                      if (needsProxy) {
                        img.src = `/api/image-proxy?url=${encodeURIComponent(img.src)}`;
                      } else {
                        img.src = img.src.replace('http://', 'https://');
                      }
                    }
                    
                    // Add error handling for broken images
                    img.onerror = () => {
                      console.warn('IDXBroker/CoreLogic image failed to load:', img.src);
                      img.src = '/placeholder.jpg';
                    };
                  }
                });
              }
            }, 1000);
          } catch (error) {
            console.error('Error processing IDXBroker widget:', error);
            setHasError(true);
          }
        };
        
        script.onerror = (error) => {
          console.warn(`IDXBroker script failed, trying iframe fallback:`, error);
          setUseIframe(true);
          setIsLoading(false);
        };
        
        // Clear any existing content
        widgetRef.current.innerHTML = '';
        
        // Append the script to the widget container
        widgetRef.current.appendChild(script);
      };
      
      // Load immediately
      loadWidget();
      
      return () => {
        // Clean up event listeners
        window.removeEventListener('error', handleGlobalError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        
        const script = document.getElementById(`idxwidgetsrc-${widgetId}`);
        if (script) {
          script.remove();
        }
      };
    }
  }, [widgetId]);

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
        {title}
      </h2>
      
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Cargando widget...</span>
        </div>
      )}
      
      {hasError && (
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600">No se pudo cargar el widget de IDXBroker</p>
          <p className="text-sm text-gray-500 mt-1">Las imágenes pueden no estar disponibles temporalmente</p>
        </div>
      )}
      
      <div className="w-full idx-widget" ref={widgetRef}>
        {/* Widget will be loaded here by useEffect */}
        {useIframe ? (
          <iframe
            src={`https://patronrealestateservices.idxbroker.com/idx/widgetpreview.php?widgetid=${widgetId}&prime=true`}
            width="100%"
            height="600"
            frameBorder="0"
            style={{ border: 'none', borderRadius: '8px' }}
            title={`IDXBroker Widget ${widgetId}`}
            onLoad={() => setIsLoading(false)}
            onError={() => setHasError(true)}
          />
        ) : (
          <IDXBrokerImageHandler containerRef={widgetRef} widgetId={widgetId} />
        )}
      </div>
      
      <style jsx global>{`
        .idx-widget img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        .idx-widget .carousel img,
        .idx-widget .gallery img {
          object-fit: cover;
          width: 100%;
          height: 200px;
        }
        .idx-widget .property-image {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        /* Estilos para las flechas de navegación del widget IDX */
        .idx-widget .slick-prev,
        .idx-widget .slick-next {
          z-index: 10;
        }
        .idx-widget .slick-prev:before,
        .idx-widget .slick-next:before {
          font-size: 24px;
          color: #84cc16;
          opacity: 0.8;
        }
        .idx-widget .slick-prev:hover:before,
        .idx-widget .slick-next:hover:before {
          opacity: 1;
          color: #65a30d;
        }
        
        /* Estilos alternativos para otros tipos de carrusel */
        .idx-widget a.prev,
        .idx-widget a.next {
          background-color: #84cc16 !important;
          color: white !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.2s ease !important;
        }
        .idx-widget a.prev:hover,
        .idx-widget a.next:hover {
          background-color: #65a30d !important;
          transform: scale(1.05);
        }
        
        /* Estilos para botones de navegación genéricos */
        .idx-widget button.prev,
        .idx-widget button.next {
          background-color: #84cc16 !important;
          color: white !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
          border: none !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.2s ease !important;
        }
        .idx-widget button.prev:hover,
        .idx-widget button.next:hover {
          background-color: #65a30d !important;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
