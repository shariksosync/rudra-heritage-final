import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: createPageMeta(
      "Website Settings | Rudra Arts Admin",
      "Configure business contact information, social links, footer copy, and business hours.",
    ),
  }),
  component: RudraApp,
});
