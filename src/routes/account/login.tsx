import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/account/login")({
  head: () => ({
    meta: createPageMeta(
      "Customer Sign In | Rudra Arts And Handicrafts",
      "Sign in to your Rudra Arts And Handicrafts account to view orders and saved pieces.",
    ),
  }),
  component: RudraApp,
});
