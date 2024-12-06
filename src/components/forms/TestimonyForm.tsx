"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { updateDocument } from "@/actions/updateDocument";
import { addDocument } from "@/actions/addDocument";

const formSchema = z.object({
  author: z.string().min(2, "Author must be at least 2 characters"),
  content: z.string().min(10, "Testimony must be at least 10 characters"),
});

interface TestimonyFormProps {
  testimony?: TestimonyT;
  update?: boolean;
  onClose?: () => void;
}

const TestimonyForm = ({ testimony, update = false,onClose }: TestimonyFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: testimony?.author || "",
      content: testimony?.content || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...values,
        date: testimony?.date || new Date().toISOString(),
        approved: testimony?.approved || false,
      };

      const result = update
        ? await updateDocument(
            "testimonies",
            testimony!.id as string,
            submissionData,
            window.location.pathname
          )
        : await addDocument(
            "testimonies",
            submissionData,
            window.location.pathname
          );

      if ("error" in result || "code" in result) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Testimony ${
          update ? "updated" : "created"
        } successfully.`,
      });
    form.reset();
    if (onClose) onClose();
    setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl mx-auto space-y-6 "
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            {update ? "Update" : "Share Your"} Testimony
          </h2>
          <p className="text-sm text-gray-500">
            Please share your experience with us
          </p>
        </div>

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-base font-semibold text-gray-900">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  {...field}
                  disabled={isSubmitting}
                  className="h-11 px-4 py-2 text-base disabled:opacity-50"
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-base font-semibold text-gray-900">
                Your Testimony
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your story here..."
                  className="min-h-[150px] px-4 py-3 text-base resize-y disabled:opacity-50"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-6 py-3 text-base font-semibold bg-black text-white hover:bg-gray-800 transition-colors rounded-xl disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {update ? "Updating..." : "Submitting..."}
            </>
          ) : (
            `${update ? "Update" : "Submit"} Testimony`
          )}
        </Button>
      </form>
    </Form>
  );
};

export default TestimonyForm;
