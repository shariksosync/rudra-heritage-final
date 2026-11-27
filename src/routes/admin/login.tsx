import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: createPageMeta(
      "Admin Sign In | Rudra Arts And Handicrafts",
      "Sign in to the Rudra Arts And Handicrafts store administration dashboard.",
    ),
  }),
  component: RudraApp,
});
