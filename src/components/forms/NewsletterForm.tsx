"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { sendNewsletter } from "@/actions/nodemailer";
import { SendIcon } from "lucide-react";

interface NewsletterFormProps {
  subscribers: SubscriberT[];
}

export default function NewsletterForm({ subscribers }: NewsletterFormProps) {
  const [sending, setSending] = useState(false);

  const form = useForm({
    defaultValues: {
      subject: "",
      content: "",
    },
  });

  const onSubmit = async (data: { subject: string; content: string }) => {
    setSending(true);
    try {
      await sendNewsletter({
        subject: data.subject,
        content: data.content,
        recipients: subscribers.map(s => s.email)
      });
      form.reset();
    } catch (error) {
      console.error(error);
    }
    setSending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Newsletter</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      className=" placeholder:text-gray-500"
                      placeholder="Newsletter subject"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      className=" placeholder:text-gray-500"
                      placeholder="Newsletter content"
                      {...field}
                      rows={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={sending}
              className="bg-black py-6 text-white hover:bg-gray-800 transition-colors duration-300 focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-xl w-full"
            >
              {sending ? "Sending..." : "Send Newsletter"}
              {!sending && <SendIcon className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}