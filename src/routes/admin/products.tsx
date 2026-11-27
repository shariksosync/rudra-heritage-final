import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: createPageMeta(
      "Manage Products | Rudra Arts Admin",
      "Add, edit, price, and organize Rudra Arts And Handicrafts catalog products.",
    ),
  }),
  component: RudraApp,
});
