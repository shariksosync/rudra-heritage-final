import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: createPageMeta(
      "Administration | Rudra Arts And Handicrafts",
      "Store administration portal for Rudra Arts And Handicrafts.",
    ),
  }),
  component: RudraApp,
});
