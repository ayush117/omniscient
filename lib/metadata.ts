import { Metadata } from "next";

export function constructMetadata({
  title = "XYZ",
  description = "Fullstack Software as a Service AI Platform",

  noIndex = false,
}: {
  title?: string;
  description?: string;

  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    applicationName: "xyz",
    keywords: [
      "AI",
      "OpenAI",
      "replicate",
      "AI Platform",
      "SaaS Application",
      "JavaScript",
    ],

    authors: { name: "Ricardo Esteves", url: "" },
    creator: "Ricardo Esteves",

    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
