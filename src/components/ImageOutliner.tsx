"use client";

import React, { useState, useRef, useEffect } from "react";

interface ImageOutlinerProps {
  initialThickness?: number;
  className?: string;
  outlineColor?: string;
}

const ImageOutliner = ({
  initialThickness = 2,
  className = "",
  outlineColor = "#000000",
}: ImageOutlinerProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [outlineThickness, setOutlineThickness] = useState(initialThickness);
  const [outlinedImageUrl, setOutlinedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.includes('png') && !file.type.includes('gif')) {
      setError("Please upload a PNG or GIF file with transparency");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Process image when image or thickness changes
  useEffect(() => {
    if (!imageUrl) return;
    processImage(imageUrl, outlineThickness);
  }, [imageUrl, outlineThickness]);

  const processImage = (imageUrl: string, thickness: number) => {
    setIsProcessing(true);
    setError(null);
    
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      try {
        // Create canvases for processing
        const canvas = document.createElement('canvas');
        
        // Set dimensions with padding for the outline
        const padding = thickness * 2;
        canvas.width = image.width + padding * 2;
        canvas.height = image.height + padding * 2;
        
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          setError("Could not initialize canvas context");
          setIsProcessing(false);
          return;
        }
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Step 1: Draw the outline silhouette
        // Draw the image in black (we'll use this to create the outline shape)
        ctx.save();
        ctx.fillStyle = outlineColor;
        ctx.shadowColor = outlineColor;
        ctx.shadowBlur = thickness;
        // Draw the image silhouette
        ctx.drawImage(image, padding, padding);
        // Use the shape as a mask
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        
        // Step 2: Draw expanded silhouette for outline
        ctx.save();
        // Set the composite operation to only show new content
        ctx.globalCompositeOperation = 'destination-over';
        ctx.shadowColor = outlineColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = thickness;
        // Draw the silhouette slightly expanded
        ctx.drawImage(image, padding, padding);
        // Fill the expanded silhouette with outline color
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = outlineColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        
        // Step 3: Draw the original image on top
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(image, padding, padding);
        
        // Set the outlined image URL
        setOutlinedImageUrl(canvas.toDataURL('image/png'));
        setIsProcessing(false);
      } catch (err) {
        console.error('Error processing image:', err);
        setError(err instanceof Error ? err.message : "Failed to process image");
        setIsProcessing(false);
      }
    };
    
    image.onerror = () => {
      setError("Failed to load image");
      setIsProcessing(false);
    };
    
    image.src = imageUrl;
  };

  const resetImage = () => {
    setImageUrl(null);
    setOutlinedImageUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Image Outliner</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload transparent PNG or GIF
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/gif"
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
          />
        </div>

        {imageUrl && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Outline Thickness: {outlineThickness}px
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={outlineThickness}
              onChange={(e) => setOutlineThickness(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Thin</span>
              <span>Thick</span>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
            <p className="mt-2 text-sm text-gray-600">Processing image...</p>
          </div>
        )}

        <div className="flex flex-col items-center mt-6">
          {outlinedImageUrl && !isProcessing && (
            <div className="space-y-4 w-full">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Original:</h3>
                  <img
                    src={imageUrl!}
                    alt="Original image"
                    className="border border-dashed border-gray-300 p-2 rounded max-h-48 object-contain w-full bg-gray-100"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Outlined:</h3>
                  <img
                    src={outlinedImageUrl}
                    alt="Outlined image"
                    className="border border-dashed border-gray-300 p-2 rounded max-h-48 object-contain w-full bg-gray-100"
                  />
                </div>
              </div>
              
              <div className="flex justify-between w-full mt-4">
                <button
                  onClick={resetImage}
                  className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                  Reset
                </button>
                <a
                  href={outlinedImageUrl}
                  download="outlined-image.png"
                  className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Download Image
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageOutliner;
