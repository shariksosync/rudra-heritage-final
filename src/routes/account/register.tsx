import { createFileRoute } from "@tanstack/react-router";
import { RudraApp } from "@/components/RudraApp.jsx";
import { createPageMeta } from "@/lib/page-meta.js";

export const Route = createFileRoute("/account/register")({
  head: () => ({
    meta: createPageMeta(
      "Create Account | Rudra Arts And Handicrafts",
      "Create a Rudra Arts And Handicrafts customer account to track orders and save your wishlist.",
    ),
  }),
  component: RudraApp,
});
