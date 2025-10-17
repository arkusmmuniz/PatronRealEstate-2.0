"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditorialVideoCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  embedUrl: string; // YouTube or Vimeo embed URL
  date: string;
  edition?: string; // e.g., "Episode 12" or "January 2024"
  featured?: boolean;
}

export function EditorialVideoCard({
  id,
  title,
  description,
  thumbnailUrl,
  embedUrl,
  date,
  edition,
  featured = false,
}: EditorialVideoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (featured) {
    return (
      <>
        {/* Featured Video Hero - Direct YouTube Embed */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          {/* Direct YouTube iframe - no click needed */}
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </>
    );
  }

  // Regular Grid Card - Click to expand
  return (
    <>
      <div 
        className="group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative aspect-video overflow-hidden rounded-xl mb-4">
          {/* Direct YouTube iframe - clickable for modal */}
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Overlay for click area */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 cursor-pointer"></div>
        </div>

        <div>
          {edition && (
            <p className="text-sm font-medium text-lime-600 mb-2">{edition}</p>
          )}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-lime-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Modal for Grid Videos - Expand on Click */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl w-[95vw] p-0 bg-black border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="relative">
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 bg-black text-white">
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-gray-300 mb-4 max-w-4xl">{description}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
                {edition && <span className="ml-2">• {edition}</span>}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}