"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDateUS } from "@/lib/utils/date-formatter";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: string;
  featured?: boolean;
  createdAt?: string; // Optional created_at for fallback when publish_date is not available
}

export function BlogCard({
  id,
  title,
  excerpt,
  author,
  date,
  category,
  imageUrl,
  readTime,
  featured = false,
  createdAt,
}: BlogCardProps) {
  const router = useRouter();
  const formattedDate = formatDateUS(date, createdAt);

  if (featured) {
    return (
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => router.push(`/blog/${id}`)}
      >
        <div
          className={
            imageUrl && imageUrl !== "/placeholder.jpg" ? "md:flex" : ""
          }
        >
          {imageUrl && imageUrl !== "/placeholder.jpg" && (
            <div className="md:w-1/2">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          )}
          <div
            className={
              imageUrl && imageUrl !== "/placeholder.jpg"
                ? "md:w-1/2"
                : "w-full"
            }
          >
            <CardContent className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="default">{category}</Badge>
                  <Badge variant="secondary">Featured</Badge>
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4 line-clamp-2">
                  {title}
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {excerpt}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{readTime}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/blog/${id}`);
                  }}
                >
                  Read Full Article
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
      onClick={() => router.push(`/blog/${id}`)}
    >
      {imageUrl && imageUrl !== "/placeholder.jpg" && (
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-3 left-3">{category}</Badge>
        </div>
      )}
      <CardContent className="p-6">
        <div className="space-y-4">
          {!imageUrl ||
            (imageUrl === "/placeholder.jpg" && (
              <Badge className="w-fit">{category}</Badge>
            ))}
          <h3 className="font-serif text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/blog/${id}`);
            }}
          >
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
