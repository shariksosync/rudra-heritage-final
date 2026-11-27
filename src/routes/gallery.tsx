import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: createPageMeta(
      "Heritage Gallery | Rudra Arts And Handicrafts",
      "View sculptures, historical replicas, traditional artwork, and customized heritage decor crafted by our Kolhapur artisans.",
    ),
  }),
  component: RudraApp,
});
