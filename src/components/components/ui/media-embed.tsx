
import React from "react";
import { Youtube, Headphones } from "lucide-react";

interface MediaEmbedProps {
  type: "youtube" | "mixlr";
  embedId: string;
  title?: string;
}

export function MediaEmbed({ type, embedId, title }: MediaEmbedProps) {
  return (
    <div className="w-full overflow-hidden rounded-md">
      {type === "youtube" && (
        <div className="relative pb-[56.25%] h-0">
          <iframe
            src={`https://www.youtube.com/embed/${embedId}`}
            title={title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </div>
      )}
      
      {type === "mixlr" && (
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="flex items-center gap-2 mb-4">
            <Headphones className="text-church-purple" />
            <h4 className="font-medium">{title || "Mixlr Audio Stream"}</h4>
          </div>
          <iframe
            src={`https://mixlr.com/users/${embedId}/embed`}
            width="100%"
            height="180px"
            scrolling="no"
            frameBorder="no"
            marginHeight={0}
            marginWidth={0}
          />
        </div>
      )}
    </div>
  );
}
