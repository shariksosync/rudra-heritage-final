import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: createPageMeta(
      "Manage Categories | Rudra Arts Admin",
      "Organize storefront heritage collections, imagery, descriptions, and ordering.",
    ),
  }),
  component: RudraApp,
});
