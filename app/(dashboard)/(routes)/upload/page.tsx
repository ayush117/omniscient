"use client";

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OpenAI from "openai";

import { formSchema } from "./constants";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import FileUpload from "@/components/file-upload";

export default function ConversationPage() {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<
    OpenAI.ChatCompletionUserMessageParam[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: OpenAI.ChatCompletionUserMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl text-white font-semibold"> XYZ </h1>
            {/* <UserButton afterSignOutUrl="/" /> */}
          </div>

          <div className="flex mt-2">
            <div className="ml-2">
              {/* <SubscriptionButton isPro={isPro} /> */}
            </div>
          </div>

          <p className="max-w-xl text-white text-lg mt-1">
            Upload your file here.
          </p>

          <div className="w-full mt-4">
            <FileUpload />
          </div>
        </div>
      </div>
    </div>
  );
}
