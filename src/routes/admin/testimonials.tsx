import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/admin/testimonials")({
  head: () => ({
    meta: createPageMeta(
      "Manage Testimonials | Rudra Arts Admin",
      "Add, edit, approve, and remove customer testimonials displayed on the storefront.",
    ),
  }),
  component: RudraApp,
});
