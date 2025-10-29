"use client";

import { useEffect, useRef } from "react";
import { IDXBrokerImageProxy } from "./idxbroker-image-proxy";

interface IDXBrokerImageHandlerProps {
  containerRef: React.RefObject<HTMLDivElement>;
  widgetId: string;
}

export function IDXBrokerImageHandler({ containerRef, widgetId }: IDXBrokerImageHandlerProps) {
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleImages = () => {
      if (!containerRef.current) return;

      const images = containerRef.current.querySelectorAll('img');
      
      images.forEach((img) => {
        // Skip if already processed
        if (img.dataset.processed === 'true') return;

        const originalSrc = img.src;
        
        // Check if it's an IDXBroker or CoreLogic image
        if (originalSrc && (
          originalSrc.includes('idxbroker.com') || 
          originalSrc.includes('patronrealestateservices.idxbroker.com') ||
          originalSrc.includes('patronrealestateservices.com') ||
          originalSrc.includes('api-trestle.corelogic.com') ||
          originalSrc.includes('trestle.corelogic.com')
        )) {
          // Check if we're on IDXBroker Integration page
          const isIDXPage = typeof window !== 'undefined' && 
                           window.location.pathname.includes('/idxbroker-integration');
          
          if (isIDXPage) {
            // On IDXBroker Integration page, use direct URLs without proxy
            img.src = originalSrc.startsWith('http://') 
              ? originalSrc.replace('http://', 'https://') 
              : originalSrc;
          } else {
            // On other pages, use proxy for problematic domains
            const needsProxy = originalSrc.includes('api-trestle.corelogic.com') || 
                             originalSrc.includes('trestle.corelogic.com');
            
            if (needsProxy) {
              img.src = `/api/image-proxy?url=${encodeURIComponent(originalSrc)}`;
            } else {
              // Ensure HTTPS for other images
              img.src = originalSrc.startsWith('http://') 
                ? originalSrc.replace('http://', 'https://') 
                : originalSrc;
            }
          }

          // Add error handling
          img.onerror = () => {
            console.warn('Image failed to load, using fallback:', originalSrc);
            img.src = '/placeholder.jpg';
            img.alt = 'Property image not available';
          };

          // Add loading state
          img.onload = () => {
            img.style.opacity = '1';
          };

          // Set initial loading state
          img.style.opacity = '0.5';
          img.style.transition = 'opacity 0.3s ease';
          
          // Mark as processed
          img.dataset.processed = 'true';
        }
      });
    };

    // Initial processing
    handleImages();

    // Set up mutation observer to handle dynamically added images
    observerRef.current = new MutationObserver((mutations) => {
      let shouldProcess = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'IMG' || element.querySelector('img')) {
                shouldProcess = true;
              }
            }
          });
        }
      });

      if (shouldProcess) {
        setTimeout(handleImages, 100);
      }
    });

    observerRef.current.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerRef, widgetId]);

  return null;
}
