import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({
    meta: createPageMeta(
      "Manage Customers | Rudra Arts Admin",
      "Search customer records, total spending, and order history.",
    ),
  }),
  component: RudraApp,
});
