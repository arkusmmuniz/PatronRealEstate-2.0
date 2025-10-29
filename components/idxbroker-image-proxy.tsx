"use client";

import { useState, useEffect } from "react";

interface IDXBrokerImageProxyProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export function IDXBrokerImageProxy({ 
  src, 
  alt, 
  className = "", 
  fallback = "/placeholder.jpg" 
}: IDXBrokerImageProxyProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states when src changes
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    console.warn('Image failed to load, using fallback:', src);
    setHasError(true);
    setImageSrc(fallback);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Check if we need to use the proxy for CoreLogic or IDXBroker images
  const needsProxy = src && (
    src.includes('api-trestle.corelogic.com') ||
    src.includes('trestle.corelogic.com') ||
    src.includes('idxbroker.com') ||
    src.includes('patronrealestateservices.idxbroker.com')
  );

  // Use proxy for problematic domains, direct URL for others
  const finalSrc = needsProxy 
    ? `/api/image-proxy?url=${encodeURIComponent(src)}`
    : (src.startsWith('http://') ? src.replace('http://', 'https://') : src);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        src={finalSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        decoding="async"
      />
      
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
}
