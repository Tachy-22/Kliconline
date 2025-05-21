"use client";
import { useForm } from "react-hook-form";
import { useState, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, X, Music, FileAudio, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
//import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { addDocument } from "@/actions/addDocument";
import { updateDocument } from "@/actions/updateDocument";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";
import { FileInput } from "@/components/ui/FileInput";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BulkUploadProgress {
  fileName: string;
  progress: number;
  status: "pending" | "uploading" | "complete" | "error";
  error?: string;
  audioUrl?: string;
  sermonId?: string;
  size?: number;
}

interface AddSermonFormProps {
  update?: boolean;
  sermon?: SermonT;
  onClose?: () => void;
}

export default function AddSermonForm({
  update,
  sermon,
  onClose,
}: AddSermonFormProps) {
  const path = usePathname();
  const [isFormOpen, setIsFormOpen] = useState(update);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("single");
  // Drag and drop states close
  const [isDragging, setIsDragging] = useState(false);
  const [bulkUploads, setBulkUploads] = useState<BulkUploadProgress[]>([]);
  const [isBulkUploading, setIsBulkUploading] = useState(false);

  // Helper function to format file size
  const formatFileSize = (bytes: number | undefined): string => {
    if (!bytes || bytes === 0) return "0 B";

    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      const kb = bytes / 1024;
      return kb < 10 ? `${kb.toFixed(1)} KB` : `${Math.round(kb)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      const mb = bytes / (1024 * 1024);
      return mb < 10 ? `${mb.toFixed(1)} MB` : `${Math.round(mb)} MB`;
    } else {
      const gb = bytes / (1024 * 1024 * 1024);
      return gb < 10 ? `${gb.toFixed(1)} GB` : `${Math.round(gb)} GB`;
    }
  };

  const form = useForm<SermonT>({
    defaultValues:
      update && sermon
        ? {
            title: sermon.title || "",
            description: sermon.description || "",
            date: sermon.date || new Date().toLocaleDateString("en-US"),
            preacher: sermon.preacher || "",
            videoUrl: sermon.videoUrl || "",
            audioUrl: sermon.audioUrl || "",
            category: sermon.category || "",
            isPublished: sermon.isPublished || false,
            thumbnailUrl: sermon.thumbnailUrl || "",
          }
        : {
            title: "",
            description: "",
            date: new Date().toLocaleDateString("en-US"),
            preacher: "",
            videoUrl: "",
            audioUrl: "",
            category: "",
            isPublished: false,
            thumbnailUrl: "",
          },
  });
  const onSubmit = async (data: SermonT) => {
    setSubmitting(true);
    try {
      if (update && sermon) {
        await updateDocument(
          "sermons",
          sermon.id as string,
          data,
          path as string
        );
        onClose?.();
      } else {
        await addDocument("sermons", data, path as string);
        form.reset();
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  // Handle drag events for bulk upload
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  // Upload a file to Cloudinary
  const uploadFile = async (
    file: File,
    onProgress: (progress: number) => void
  ): Promise<string> => {
    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_uploads"); // Your upload preset

    // Simulate progress updates
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      if (progress < 90) {
        onProgress(progress);
      }
    }, 300);

    try {
      // Perform the actual upload
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env
          .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/auto/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`);
      }

      const data = await res.json();

      clearInterval(progressInterval);
      onProgress(100);

      return data.secure_url;
    } catch (error) {
      clearInterval(progressInterval);
      throw error;
    }
  };

  // Handle drop event for bulk upload
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (!files || files.length === 0) return;

    // Filter for audio files
    const audioFiles = Array.from(files).filter(
      (file) =>
        file.type.startsWith("audio/") ||
        file.name.endsWith(".mp3") ||
        file.name.endsWith(".wav") ||
        file.name.endsWith(".ogg")
    );

    if (audioFiles.length === 0) return;
    // Initialize bulk upload process
    const uploads = audioFiles.map((file) => ({
      fileName: file.name,
      progress: 0,
      status: "pending" as const,
      size: file.size,
    }));
    setBulkUploads(uploads);
    setIsBulkUploading(true);

    // Make sure the form is open and the bulk tab is active
    setIsFormOpen(true);
    setActiveTab("bulk");

    // Process each file
    for (let i = 0; i < audioFiles.length; i++) {
      const file = audioFiles[i];

      // Update status to uploading
      setBulkUploads((prev) =>
        prev.map((upload, idx) =>
          idx === i ? { ...upload, status: "uploading" as const } : upload
        )
      );
      try {
        // Upload file to Cloudinary
        const uploadedUrl = await uploadFile(file, (progress) => {
          // Update progress
          setBulkUploads((prev) =>
            prev.map((upload, idx) =>
              idx === i ? { ...upload, progress } : upload
            )
          );
        });

        // Just update status to complete with the URL (don't create sermon yet)
        setBulkUploads((prev) =>
          prev.map((upload, idx) =>
            idx === i
              ? {
                  ...upload,
                  status: "complete",
                  progress: 100,
                  audioUrl: uploadedUrl,
                }
              : upload
          )
        );
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        // Update status to error
        setBulkUploads((prev) =>
          prev.map((upload, idx) =>
            idx === i
              ? {
                  ...upload,
                  status: "error",
                  error:
                    error instanceof Error ? error.message : "Upload failed",
                }
              : upload
          )
        );
      }
    }

    setIsBulkUploading(false);
  };

  // Submit all bulk uploads
  const submitBulkUploads = async () => {
    setSubmitting(true);

    const completedUploads = bulkUploads.filter(
      (upload) =>
        upload.status === "complete" && upload.audioUrl && !upload.sermonId
    );

    if (completedUploads.length === 0) {
      setSubmitting(false);
      return;
    }

    // Create a copy of the uploads to update while processing
    let updatedUploads = [...bulkUploads];

    for (let i = 0; i < completedUploads.length; i++) {
      const upload = completedUploads[i];

      try {
        // Create a new sermon with default values
        const sermonData: SermonT = {
          title: upload.fileName.replace(/\.(mp3|wav|ogg)$/i, ""),
          description: "Listen and be blessed.",
          date: new Date().toLocaleDateString("en-US"),
          preacher: "Pastor (Dr.) Sam Adewuyi",
          videoUrl: "",
          audioUrl: upload.audioUrl,
          category: "",
          isPublished: false,
          thumbnailUrl: "",
        };
        // Add the sermon to Firestore
        const result = await addDocument("sermons", sermonData, path as string);

        // Type guard to check if result has an id property
        if ("id" in result) {
          // Success case - update the upload with the sermon ID
          updatedUploads = updatedUploads.map((u) =>
            u === upload ? { ...u, sermonId: result.id } : u
          );
        } else {
          // Error case - handle FirebaseError
          console.error(`Error creating sermon: ${result.message}`);
          updatedUploads = updatedUploads.map((u) =>
            u === upload
              ? { ...u, status: "error" as const, error: result.message }
              : u
          );
        }

        // Update the state
        setBulkUploads(updatedUploads);
      } catch (error) {
        console.error(`Error creating sermon for ${upload.fileName}:`, error);
      }
    }

    setSubmitting(false);
  };

  return (
    <>
      {!update && (
        <CardHeader className="px-0 ">
          <Button
            className={`w-fit py-3 font-medium rounded-xl   ${
              isFormOpen
                ? "border-black hover:border-white border bg-transparent text-black   hover:bg-red-500 hover:text-white"
                : "bg-black hover:bg-gray-800 text-white"
            }`}
            onClick={() => setIsFormOpen((prev) => !prev)}
          >
            {!isFormOpen ? (
              <span className="flex  items-center justify-between gap-2">
                {" "}
                Add New Sermon <Plus />
              </span>
            ) : (
              <span className="flex  items-center justify-between gap-2">
                {" "}
                Close <X />
              </span>
            )}
          </Button>
        </CardHeader>
      )}

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 1 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            style={{ overflow: "hidden" }}
          >
            <CardContent>
              {update ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900">
                            Title{" "}
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-slate-700  placeholder:text-gray-500 rounded"
                              placeholder="Sermon title"
                              maxLength={100}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900">
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="rounded placeholder:text-gray-500"
                              placeholder="Sermon description"
                              maxLength={500}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900">Date </FormLabel>
                          <Popover>
                            <PopoverTrigger className="rounded" asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    formatToMonthDayYear(field.value)
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                className="bg-white"
                                mode="single"
                                selected={new Date(field.value as string)}
                                onSelect={field.onChange}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preacher"
                      render={({ field }) => (
                        <FormItem className="rounded">
                          <FormLabel className="text-gray-900">
                            Preacher
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-slate-700  placeholder:text-gray-500 rounded"
                              placeholder="Preacher name"
                              maxLength={50}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem className="rounded">
                          <FormLabel className="text-gray-900">
                            Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Sunday Service">
                                Sunday Service
                              </SelectItem>
                              <SelectItem value="Spontaneous Worship">
                                Spontaneous Worship
                              </SelectItem>
                              <SelectItem value="IDBS Service">
                                IDBS Service
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4">
                      {/* <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                          <FormItem className="rounded">
                            <FormLabel className="text-gray-900">
                              Video URL
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="placeholder:text-gray-500 rounded"
                                placeholder="Video URL"
                                {...field}
                              />
                            </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                          </FormItem>
                        )}
                      /> */}

                      <FormField
                        control={form.control}
                        name="audioUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900">
                              Audio File
                            </FormLabel>
                            <FormControl>
                              <FileInput
                                className="rounded"
                                accept="audio/*"
                                multiple={false}
                                maxSize={1}
                                maxFileSize={50}
                                initialFiles={field.value ? [field.value] : []}
                                onUploadComplete={(files) => {
                                  if (files.length > 0) {
                                    field.onChange(files[0].url);
                                  }
                                }}
                                onError={(error) => {
                                  form.setError("audioUrl", {
                                    type: "manual",
                                    message: error,
                                  });
                                }}
                              />
                            </FormControl>
                            <FormMessage className="text-sm text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="thumbnailUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900">
                            Thumbnail image
                          </FormLabel>
                          <FormControl>
                            <FileInput
                              accept="image/*"
                              multiple={false}
                              maxSize={1}
                              maxFileSize={10}
                              initialFiles={field.value ? [field.value] : []}
                              onUploadComplete={(files) => {
                                if (files.length > 0) {
                                  field.onChange(files[0].url);
                                }
                              }}
                              onError={(error) => {
                                form.setError("thumbnailUrl", {
                                  type: "manual",
                                  message: error,
                                });
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isPublished"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded border p-3">
                          <div className="space-y-0.5">
                            <FormLabel className="text-gray-900">
                              Published
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 focus:ring-2 focus:ring-black focus:ring-offset-2 rounded w-full"
                    >
                      {submitting
                        ? "Submitting..."
                        : update
                        ? "Update Sermon"
                        : "Add Sermon"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Tabs
                  defaultValue="single"
                  className="w-full"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="single">Single Upload</TabsTrigger>
                    <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
                  </TabsList>

                  <TabsContent value="single">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900">
                                Title{" "}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-slate-700  placeholder:text-gray-500 rounded"
                                  placeholder="Sermon title"
                                  maxLength={100}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900">
                                Description
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  className="rounded placeholder:text-gray-500"
                                  placeholder="Sermon description"
                                  maxLength={500}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900">
                                Date{" "}
                              </FormLabel>
                              <Popover>
                                <PopoverTrigger className="rounded" asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value ? (
                                        formatToMonthDayYear(field.value)
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    className="bg-white"
                                    mode="single"
                                    selected={new Date(field.value as string)}
                                    onSelect={field.onChange}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preacher"
                          render={({ field }) => (
                            <FormItem className="rounded">
                              <FormLabel className="text-gray-900">
                                Preacher
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-slate-700  placeholder:text-gray-500 rounded"
                                  placeholder="Preacher name"
                                  maxLength={50}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem className="rounded">
                              <FormLabel className="text-gray-900">
                                Category
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Sunday Service">
                                    Sunday Service
                                  </SelectItem>
                                  <SelectItem value="Spontaneous Worship">
                                    Spontaneous Worship
                                  </SelectItem>
                                  <SelectItem value="IDBS Service">
                                    IDBS Service
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 gap-4">
                          <FormField
                            control={form.control}
                            name="audioUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-900">
                                  Audio File
                                </FormLabel>
                                <FormControl>
                                  <FileInput
                                    className="rounded"
                                    accept="audio/*"
                                    multiple={false}
                                    maxSize={1}
                                    maxFileSize={50}
                                    initialFiles={
                                      field.value ? [field.value] : []
                                    }
                                    onUploadComplete={(files) => {
                                      if (files.length > 0) {
                                        field.onChange(files[0].url);
                                      }
                                    }}
                                    onError={(error) => {
                                      form.setError("audioUrl", {
                                        type: "manual",
                                        message: error,
                                      });
                                    }}
                                  />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500" />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="thumbnailUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-900">
                                Thumbnail image
                              </FormLabel>
                              <FormControl>
                                <FileInput
                                  accept="image/*"
                                  multiple={false}
                                  maxSize={1}
                                  maxFileSize={10}
                                  initialFiles={
                                    field.value ? [field.value] : []
                                  }
                                  onUploadComplete={(files) => {
                                    if (files.length > 0) {
                                      field.onChange(files[0].url);
                                    }
                                  }}
                                  onError={(error) => {
                                    form.setError("thumbnailUrl", {
                                      type: "manual",
                                      message: error,
                                    });
                                  }}
                                />
                              </FormControl>
                              <FormMessage className="text-sm text-red-500" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="isPublished"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-gray-900">
                                  Published
                                </FormLabel>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={submitting}
                          className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 focus:ring-2 focus:ring-black focus:ring-offset-2 rounded w-full"
                        >
                          {submitting
                            ? "Submitting..."
                            : update
                            ? "Update Sermon"
                            : "Add Sermon"}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  <TabsContent value="bulk">
                    <div className="space-y-6">
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 ${
                          isDragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <FileAudio className="w-16 h-16 text-gray-400 mb-3" />
                          <h3 className="text-lg font-medium">
                            Bulk Upload Audio Files
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 mb-4">
                            Drag and drop multiple audio files here to create
                            sermons automatically
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-2"
                            onClick={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.accept = "audio/*";
                              input.multiple = true;
                              input.onchange = (e) => {
                                const target = e.target as HTMLInputElement;
                                if (target.files && target.files.length > 0) {
                                  // Create a mock drop event with these files
                                  const dt = new DataTransfer();
                                  Array.from(target.files).forEach((file) =>
                                    dt.items.add(file)
                                  );

                                  const mockEvent = {
                                    preventDefault: () => {},
                                    stopPropagation: () => {},
                                    dataTransfer: dt,
                                  } as unknown as DragEvent<HTMLDivElement>;

                                  handleDrop(mockEvent);
                                }
                              };
                              input.click();
                            }}
                          >
                            Select Files
                          </Button>
                        </div>
                      </div>

                      {bulkUploads.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="text-md font-medium">
                            Bulk Upload Progress
                          </h3>
                          <div className="space-y-3">
                            {bulkUploads.map((upload, index) => (
                              <div
                                key={index}
                                className="border rounded-lg p-4"
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <div className="flex items-center gap-2">
                                    <Music className="w-4 h-4 text-gray-500" />
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {upload.fileName}
                                      </span>
                                      {upload.size && (
                                        <span className="text-xs text-gray-500">
                                          {formatFileSize(upload.size)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-sm px-2 py-1 rounded ${
                                        upload.status === "complete"
                                          ? "bg-green-100 text-green-800"
                                          : upload.status === "error"
                                          ? "bg-red-100 text-red-800"
                                          : upload.status === "uploading"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-gray-100 text-gray-800"
                                      }`}
                                    >
                                      {upload.status === "complete"
                                        ? upload.sermonId
                                          ? "Added"
                                          : "Ready"
                                        : upload.status === "error"
                                        ? "Error"
                                        : upload.status === "uploading"
                                        ? "Uploading"
                                        : "Pending"}
                                    </span>
                                    {upload.status !== "uploading" && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                                        onClick={() => {
                                          setBulkUploads((prevUploads) =>
                                            prevUploads.filter(
                                              (_, i) => i !== index
                                            )
                                          );
                                        }}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                <Progress
                                  value={upload.progress}
                                  className={`h-2 ${
                                    upload.status === "complete"
                                      ? "bg-green-100"
                                      : upload.status === "error"
                                      ? "bg-red-100"
                                      : "bg-blue-100"
                                  }`}
                                />
                                {upload.status === "error" && (
                                  <div className="mt-2">
                                    <p className="text-sm text-red-500">
                                      {upload.error}
                                    </p>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="mt-1 text-xs"
                                      onClick={() => {
                                        // Reset the error state to allow retrying
                                        setBulkUploads((prevUploads) =>
                                          prevUploads.map((u, i) =>
                                            i === index
                                              ? {
                                                  ...u,
                                                  status: "pending",
                                                  progress: 0,
                                                  error: undefined,
                                                }
                                              : u
                                          )
                                        );
                                      }}
                                    >
                                      Retry
                                    </Button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>

                          <Button
                            disabled={
                              submitting ||
                              isBulkUploading ||
                              bulkUploads.every(
                                (u) => u.sermonId || u.status === "error"
                              )
                            }
                            onClick={submitBulkUploads}
                            className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 focus:ring-2 focus:ring-black focus:ring-offset-2 rounded w-full mt-4"
                          >
                            {submitting ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />{" "}
                                Creating Sermons...
                              </span>
                            ) : bulkUploads.every(
                                (u) => u.sermonId || u.status === "error"
                              ) ? (
                              "All Sermons Created"
                            ) : (
                              "Create Sermons from Uploads"
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
