import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({
    meta: createPageMeta(
      "Order Confirmation | Rudra Arts And Handicrafts",
      "Your demo order has been recorded with Rudra Arts And Handicrafts.",
    ),
  }),
  component: RudraApp,
});
