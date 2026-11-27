import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: createPageMeta(
      "Manage Orders | Rudra Arts Admin",
      "Track customer orders, payment preferences, and fulfillment statuses.",
    ),
  }),
  component: RudraApp,
});
