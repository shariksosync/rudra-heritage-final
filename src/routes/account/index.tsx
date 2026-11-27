import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/account/")({
  head: () => ({
    meta: createPageMeta(
      "Customer Account | Rudra Arts And Handicrafts",
      "View your profile details, order history, and saved wishlist pieces.",
    ),
  }),
  component: RudraApp,
});
