import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: createPageMeta(
      "Page Not Found | Rudra Arts And Handicrafts",
      "The requested page could not be found. Return to Rudra Arts And Handicrafts.",
    ),
  }),
  component: RudraApp,
});
