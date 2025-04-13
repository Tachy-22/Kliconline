"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addDocument } from "@/actions/addDocument";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface TestimonyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestimonyForm = ({ isOpen, onClose }: TestimonyFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const testimonyData: TestimonyT = {
        author: formData.author,
        title: formData.title || "My Testimony",
        content: formData.content,
        date: new Date().toISOString(),
        approved: false, // Set to false so it requires admin approval
      };

      const result = await addDocument<TestimonyT>(
        "testimonies",
        testimonyData,
        "/testimonies"
      );

      if ("code" in result) {
        throw new Error(result.message);
      }

      toast({
        title: "Testimony Submitted",
        description:
          "Thank you for sharing your testimony. It will be reviewed before being published.",
        variant: "default",
      });

      // Reset form and close modal
      setFormData({ author: "", title: "", content: "" });
      onClose();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error submitting your testimony. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold">
            Share Your Testimony
          </DialogTitle>
          <DialogDescription>
            Tell us how God has worked in your life through Kingdom Life
            International Church.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="author">Your Name</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Testimony Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Miraculous Healing, Financial Breakthrough"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Your Testimony</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Share the details of your testimony here..."
              rows={6}
              required
            />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-church-purple hover:bg-church-purple-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Testimony"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonyForm;
