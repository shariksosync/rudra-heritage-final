import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: createPageMeta(
      "Checkout | Rudra Arts And Handicrafts",
      "Complete your delivery details and demo payment preference for your Rudra Arts And Handicrafts order.",
    ),
  }),
  component: RudraApp,
});
