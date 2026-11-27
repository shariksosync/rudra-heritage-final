import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/inquiries")({
  head: () => ({
    meta: createPageMeta(
      "Customer Inquiries | Rudra Arts Admin",
      "Review and update custom order requests, product inquiries, and contact messages.",
    ),
  }),
  component: RudraApp,
});
