import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { RudraProvider } from "@/context/RudraContext.jsx";
import { reportLovableError } from "../lib/lovable-error-reporting";

const CREST_FAVICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#5B1725"/><rect x="3" y="3" width="26" height="26" fill="none" stroke="#C6A15B" stroke-width="1.5"/><path d="M9 24V12l7-5 7 5v12M13 24v-6h6v6M11 13h10" fill="none" stroke="#F8F3E9" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  );

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md border border-border bg-card p-8 text-center shadow-product">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Rudra Arts And Handicrafts
        </p>
        <h1 className="mt-3 font-display text-5xl text-foreground">404</h1>
        <h2 className="mt-3 font-display text-xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md border border-border bg-card p-8 text-center shadow-product">
        <h1 className="font-display text-2xl text-foreground">This page did not load</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rudra Arts And Handicrafts | Kolhapur Heritage Sculptures & Art" },
      {
        name: "description",
        content:
          "Handcrafted Chhatrapati Shivaji Maharaj statues, Maratha historical replicas, traditional weaponry, and customized heritage decor from Kolhapur, Maharashtra.",
      },
      { name: "author", content: "Rudra Arts And Handicrafts" },
      {
        property: "og:title",
        content: "Rudra Arts And Handicrafts | Kolhapur Heritage Sculptures & Art",
      },
      {
        property: "og:description",
        content:
          "Handcrafted Chhatrapati Shivaji Maharaj statues, Maratha historical replicas, traditional weaponry, and customized heritage decor from Kolhapur, Maharashtra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: CREST_FAVICON, type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <RudraProvider>
        <Outlet />
      </RudraProvider>
    </QueryClientProvider>
  );
}
