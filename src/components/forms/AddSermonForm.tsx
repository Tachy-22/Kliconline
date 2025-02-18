"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { CalendarIcon, Plus, X } from "lucide-react";
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
import { FileInput } from "../ui/FileInput";
import formatToMonthDayYear from "@/lib/formatToMonthDayYear";

// interface SermonFormData {
//   title: string;
//   description: string;
//   date: Date | { seconds: number; nanoseconds: number; };
//   preacher: string;
//   videoUrl: string;
//   audioUrl: string;
//   category: string;
//   isPublished: boolean;
//   thumbnailUrl: string;
//   [key: string]: unknown;
// }

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

  return (
    <>
      {!update && (
        <CardHeader className="px-0 ">
          <Button
            className={`w-fit py-3 font-medium rounded-xl ${
              isFormOpen
                ? "border-black border text-black hover:bg-black hover:text-white"
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
                        <FormLabel className="text-gray-900">Title</FormLabel>
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
                        <FormLabel className="text-gray-900">Date</FormLabel>
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
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              className="bg-white"
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
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
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
