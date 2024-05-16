"use client";
// import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import { Triangle } from 'react-loader-spinner';
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

/* User file upload component */
const FileUpload = () => {
  //Allows API calls to backend
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);
//   const { mutate, isPending } = useMutation({
//     mutationFn: async ({
//       file_key,
//       file_name,
//     }: {
//       file_key: string;
//       file_name: string;
//     }) => {
//       const response = await axios.post("/api/create-chat", {
//         file_key,
//         file_name,
//       });
//       return response.data;
//     },
//   });

  //React file drop
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      //File is larger than 10mb
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large.");
        return;
      }

      try {
        setUploading(true);
        // const data = await uploadToS3(file);
        // if (!data?.file_key || !data.file_name) {
        //   toast.error("Something went wrong.");
        //   return;
        // }
        // mutate({
        //     file_key: "",
        //     file_name: ""
        // }, {
        //   onSuccess: ({ chat_id }: { chat_id : any }) => {
        //     toast.success("Chat created!");
        //     router.push(`/chat/${chat_id}`);
        //   },
        //   onError: (error: any) => {
        //     toast.error("Error creating chat.");
        //     console.error(error);
        //   },
        // });
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
            setUploading(false);
        }, 10000);
      }
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <>
             <Triangle
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;