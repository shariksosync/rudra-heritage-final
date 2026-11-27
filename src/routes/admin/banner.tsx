import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/banner")({
  head: () => ({
    meta: createPageMeta(
      "Banner & Announcement | Rudra Arts Admin",
      "Update the announcement bar, hero banner image, headline, subtitle, and action buttons.",
    ),
  }),
  component: RudraApp,
});
