import { useState, useRef, DragEvent } from "react";
import { cn } from "@/lib/utils";
import { uploadFile } from "@/actions/upload";
import { X } from "lucide-react"; // Add this import

export interface FileMetadata {
  url: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface FileInputProps {
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  maxFileSize?: number; // in MB
  onUploadComplete?: (files: FileMetadata[]) => void;
  onError?: (error: string) => void;
  className?: string;
  initialFiles?: string[];
}

interface FileWithProgress {
  file: File;
  progress: number;
  url?: string;
  error?: string;
}

export function FileInput({
  multiple = false,
  accept = "*/*",
  maxSize = 5,
  maxFileSize = 10, // default 10MB per file
  onUploadComplete,
  onError,
  className,
  initialFiles = [],
}: FileInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileWithProgress[]>(() =>
    initialFiles.map((url) => ({
      file: new File([], url.split("/").pop() || "file", { type: "image/*" }),
      progress: 100,
      url,
    }))
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const removeFile = (fileToRemove: FileWithProgress) => {
    setFiles((prev) => prev.filter((f) => f.file !== fileToRemove.file));
    // Get remaining files and notify parent
    const remainingFiles = files
      .filter((f) => f.file !== fileToRemove.file && f.url)
      .map((f) => ({
        url: f.url as string,
        name: f.file.name,
        size: f.file.size,
        type: f.file.type,
        lastModified: f.file.lastModified,
      }));
    onUploadComplete?.(remainingFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (maxFileSize && file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB`;
    }
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `File size exceeds ${maxSize}MB`;
    }
    if (
      accept !== "*/*" &&
      !accept.split(",").some((type) => file.type.match(type))
    ) {
      return "File type not accepted";
    }
    return null;
  };

  const handleFiles = async (newFiles: FileList) => {
    const filesToUpload = Array.from(newFiles).map((file) => ({
      file,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...filesToUpload]);

    for (const fileData of filesToUpload) {
      const error = validateFile(fileData.file);
      if (error) {
        onError?.(error);
        setFiles((prev) =>
          prev.map((f) => (f.file === fileData.file ? { ...f, error } : f))
        );
        continue;
      }

      setFiles((prev) =>
        prev.map((f) => (f.file === fileData.file ? { ...f, progress: 10 } : f))
      );

      try {
        const buffer = await fileData.file.arrayBuffer();
        const result = await uploadFile({
          buffer,
          filename: fileData.file.name,
          contentType: fileData.file.type,
        });

        if ("error" in result) {
          setFiles((prev) =>
            prev.map((f) =>
              f.file === fileData.file
                ? { ...f, error: result.error, progress: 0 }
                : f
            )
          );
          onError?.(result.error as string);
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.file === fileData.file
                ? { ...f, url: result.url, progress: 100 }
                : f
            )
          );

          const completedFiles = files
            .filter((f) => f.url)
            .map((f) => ({
              url: f.url as string,
              name: f.file.name,
              size: f.file.size,
              type: f.file.type,
              lastModified: f.file.lastModified,
            }));

          const newFileMetadata: FileMetadata = {
            url: result.url,
            name: fileData.file.name,
            size: fileData.file.size,
            type: fileData.file.type,
            lastModified: fileData.file.lastModified,
          };

          onUploadComplete?.([...completedFiles, newFileMetadata]);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Upload failed";
        setFiles((prev) =>
          prev.map((f) =>
            f.file === fileData.file
              ? { ...f, error: errorMessage, progress: 0 }
              : f
          )
        );
        onError?.(errorMessage);
      }
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
          className
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <p>Drag and drop files here, or click to select files</p>
        <p className="text-sm text-gray-500">
          {multiple ? "Upload multiple files" : "Upload a file"}
          {accept !== "*/*" && ` (${accept})`}
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="border rounded p-2">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex justify-between items-center pr-2">
                    <span className="truncate">{file.file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(file)}
                      className="ml-2 p-1 hover:bg-gray-100 rounded"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatFileSize(file.file.size)}
                    {file.file.size > maxFileSize * 1024 * 1024 && (
                      <span className="text-red-500 ml-2">
                        (Exceeds {maxFileSize}MB limit)
                      </span>
                    )}
                  </span>
                </div>
                <span>{Math.round(file.progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className={cn(
                    "h-2 rounded-full",
                    file.error ? "bg-red-500" : "bg-black"
                  )}
                  style={{ width: `${file.progress}%` }}
                />
              </div>
              {file.error && (
                <p className="text-sm text-red-500 mt-1">{file.error}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
