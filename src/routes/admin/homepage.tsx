import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/homepage")({
  head: () => ({
    meta: createPageMeta(
      "Homepage Content | Rudra Arts Admin",
      "Manage homepage story, craftsmanship highlights, gallery items, section visibility, and ordering.",
    ),
  }),
  component: RudraApp,
});
