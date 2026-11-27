import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: createPageMeta(
      "Admin Overview | Rudra Arts And Handicrafts",
      "View storefront statistics, recent orders, customer inquiries, and quick actions.",
    ),
  }),
  component: RudraApp,
});
