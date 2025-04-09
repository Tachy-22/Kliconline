"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "@/actions/auth";
import { Button } from "@/components/components/ui/button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/components/ui/form";
import { Input } from "@/components/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignIn() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError("");
      const result = await signIn(values.email, values.password);
      if (result.success) {
        router.replace("/admin");
      } else {
        switch (result.error) {
          case "auth/user-not-found":
            setError("No user found with this email.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password. Please try again.");
            break;
          case "Firebase: Error (auth/invalid-credential).":
            setError("Incorrect password or email. Please try again.");
            break;
          default:
            setError(result.error || "An error occurred");
        }
      }
    } catch (error: unknown) {
      setError(
        `An unexpected error occurred: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="space-y-6 w-full max-w-md p-10 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="space-y-2">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200 hover:underline underline-offset-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 text-center tracking-tight">
            Klic Admin Login
          </h1>
        </div>
        {error && (
          <p className="text-red-600 text-sm bg-red-50 p-3 rounded border border-red-100">
            {error}
          </p>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-800">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@company.com"
                      {...field}
                      type="email"
                      className="h-11 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 text-gray-900 placeholder:text-gray-400 placeholder:text-sm"
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-medium text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-800">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="h-11 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:border-black transition-all duration-200 text-gray-900 placeholder:text-gray-400 placeholder:text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent focus:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500 hover:text-gray-700 transition-colors" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm font-medium text-red-600" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-11 bg-black text-white hover:bg-gray-800 transition-all duration-200 rounded-lg font-medium tracking-wide focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
