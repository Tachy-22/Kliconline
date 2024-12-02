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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
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
import { FileInput, FileMetadata } from "../ui/FileInput";

interface AddEventFormProps {
  update?: boolean;
  event?: EventT;
  onClose?: () => void;
}

type FormData = {
  title: string;
  description: string;
  date: Date | { seconds: number; nanoseconds: number };
  time: string;
  location: string;
  category: string;
  mediaUrl: string;
  status: "upcoming" | "past" | "cancelled";
  isPublished: boolean;
  images: string[];
};

export default function AddEventForm({
  update,
  event,
  onClose,
}: AddEventFormProps) {
  const path = usePathname();
  const [isFormOpen, setIsFormOpen] = useState(update);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(
    event?.images || []
  );

  const form = useForm<FormData>({
    mode: "onChange",
    defaultValues:
      update && event
        ? {
            title: event?.title || "",
            description: event?.description || "",
            date: event?.date || "",
            time: event?.time || "",
            location: event?.location || "",
            category: event?.category || "",
            mediaUrl: event?.mediaUrl || "",
            status: event?.status || "",
            isPublished: event?.isPublished || false,
            images: event?.images || [],
          }
        : {
            status: "upcoming",
            isPublished: false,
            images: [],
            category: "",
          },
  });
  console.log({ uploadedFiles });
  const handleUploadComplete = (files: FileMetadata[]) => {
    const urls = files.map((file) => file.url);
    setUploadedFiles(urls); // Replace instead of append
    form.setValue("images", urls); // Update form state directly with new list
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      if (update && event) {
        const result = await updateDocument(
          "events",
          event.id,
          data,
          path as string
        );
        if (result) {
          onClose?.();
        }
      } else {
        const result = await addDocument("events", data, path as string);
        if (result) {
          form.reset();
          setIsFormOpen(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <Card className="min-w-full mx-auto shadow-none border-0 ">
      {!update && (
        <CardHeader className="px-0 ">
          <Button
            className={`w-fit py-3  font-medium rounded-full ${
              isFormOpen
                ? "border-red-500 border text-red-500 hover:border-red-600"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
            onClick={() => setIsFormOpen((prev) => !prev)}
          >
            {!isFormOpen ? (
              <span className="flex  items-center justify-between gap-2">
                {" "}
                Add New Event <Plus />
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
        {(isFormOpen || update) && (
          <motion.div
            initial={{ height: 0, opacity: 1 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "anticipate" }}
            style={{ overflow: "hidden" }}
          >
            <CardContent className="!bg-white rounded py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className=" bg-white grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{
                      required: "Title is required",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Title must be less than 100 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Title</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded border-slate-700"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">
                          Category
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="border-slate-700 rounded">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MUSIC">Music</SelectItem>
                            <SelectItem value="SPORTS">Sports</SelectItem>
                            <SelectItem value="ARTS">Arts</SelectItem>
                            <SelectItem value="FOOD">Food</SelectItem>
                            <SelectItem value="OTHER">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-gray-900">Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild className="border-slate-700">
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 rounded text-left font-normal",
                                  !field.value && "text-muted-foreground "
                                )}
                              >
                                {field.value ? (
                                  format(
                                    field.value instanceof Date
                                      ? field.value
                                      : new Date(field.value.seconds * 1000),
                                    "PPP"
                                  )
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50 rounded" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto  p-0" align="start">
                            <Calendar
                              className="bg-white"
                              mode="single"
                              selected={
                                field.value instanceof Date
                                  ? field.value
                                  : field.value
                                  ? new Date(field.value.seconds * 1000)
                                  : undefined
                              }
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setHours(0, 0, 0, 0))
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    rules={{ required: "Time is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Time</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded border-slate-700"
                            type="time"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    rules={{ required: "Location is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded border-slate-700"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mediaUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">
                          Media URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded border-slate-700"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    rules={{ required: "Status is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded border-slate-700">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded border-slate-700">
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded border border-slate-700 p-4 py-1">
                        <div className="cursor-pointer">
                          <FormLabel className="text-base">Published</FormLabel>
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

                  <div className="col-span-1 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      rules={{
                        required: "Description is required",
                        minLength: {
                          value: 20,
                          message: "Description must be at least 20 characters",
                        },
                        maxLength: {
                          value: 1000,
                          message:
                            "Description must be less than 1000 characters",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900">
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="h-32 rounded border-slate-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 gap-3 fles flex-col">
                    <div className=" pb-3 text-gray-900">Add Event Image</div>
                    <FileInput
                      multiple
                      accept="image/*"
                      maxFileSize={5}
                      onUploadComplete={handleUploadComplete}
                      initialFiles={event?.images || []}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <Button
                      className={`  transition-colors duration-300 focus:ring-2 focus:ring-offset-2 rounded py-6 w-full hover:text-white ${
                        isFormOpen
                          ? "bg-orange-500 text-white   hover:bg-orange-600 focus:ring-orange-500 "
                          : "bg-orange-500 text-white  hover:bg-orange-600 focus:ring-orange-500 "
                      }`}
                      disabled={submitting}
                    >
                      {submitting
                        ? update
                          ? "Updating Event..."
                          : "Adding Event..."
                        : update
                        ? "Update Event"
                        : "Add Event"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
