"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { addDocument } from "@/actions/addDocument";
import { updateDocument } from "@/actions/updateDocument";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface BranchesFormProps {
  update?: boolean;
  branch?: BranchT;
  onClose?: () => void;
}

type FormData = {
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  phone: string;
};

export default function BranchesForm({
  update,
  branch,
  onClose,
}: BranchesFormProps) {
  const path = usePathname();
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(update);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: branch?.name || "",
      address: branch?.address || "",
      latitude: branch?.latitude || null,
      longitude: branch?.longitude || null,
      phone: branch?.phone || "",
    },
  });

  useEffect(() => {
    if (!update && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue('latitude', position.coords.latitude);
          form.setValue('longitude', position.coords.longitude);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, [update, form]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      if (update && branch) {
        const result = await updateDocument(
          "branches",
          branch.id,
          data,
          path as string
        );
        if (result) {
          onClose?.();
        }
      } else {
        const result = await addDocument("branches", data, path as string);
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

  if (loading) {
    return <div>Getting your location...</div>;
  }

  return (
    <Card className="min-w-full mx-auto shadow-none border-0">
      {!update && (
        <CardHeader className="px-0">
          <Button
            className={`w-fit py-3 font-medium rounded-xl ${
              isFormOpen
                ? "border-black border text-black hover:bg-black hover:text-white"
                : "bg-black hover:bg-gray-800 text-white"
            }`}
            onClick={() => setIsFormOpen((prev) => !prev)}
          >
            {!isFormOpen ? (
              <span className="flex items-center justify-between gap-2">
                Add New Branch <Plus />
              </span>
            ) : (
              <span className="flex items-center justify-between gap-2">
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
            <CardContent className="!bg-white rounded py-4 p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="bg-white grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Branch name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Branch Name</FormLabel>
                        <FormControl>
                          <Input
                            className="border-slate-200 hover:border-slate-300 focus:border-slate-400 transition-colors rounded-lg
                            placeholder:text-slate-400 text-gray-900"
                            placeholder="Enter branch name..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Address</FormLabel>
                        <FormControl>
                          <Input
                            className="rounded border-slate-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    rules={{ required: "Admin phone number is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Admin Phone</FormLabel>
                        <FormControl>
                          <Input
                            className="border-slate-200 hover:border-slate-300 focus:border-slate-400 transition-colors rounded-lg
                            placeholder:text-slate-400 text-gray-900"
                            placeholder="Enter admin phone number..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="latitude"
                    rules={{ required: "Latitude is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            className="rounded border-slate-700"
                            {...field}
                            value={field.value ?? ''}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longitude"
                    rules={{ required: "Longitude is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            className="rounded border-slate-700"
                            {...field}
                            value={field.value ?? ''}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-1 md:col-span-2">
                    <Button
                      className="transition-colors duration-300 focus:ring-2 focus:ring-offset-2 rounded py-6 w-full bg-black text-white hover:bg-gray-800 focus:ring-black"
                      disabled={submitting}
                    >
                      {submitting
                        ? update
                          ? "Updating Branch..."
                          : "Adding Branch..."
                        : update
                        ? "Update Branch"
                        : "Add Branch"}
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