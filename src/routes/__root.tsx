import type { ReactNode } from "react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { HUSHVOTING_LOGO_SRC } from "~/components/landing/BrandMark";
import "../../styles/app.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HushVoting" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: HUSHVOTING_LOGO_SRC },
      { rel: "apple-touch-icon", href: HUSHVOTING_LOGO_SRC },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
});

function RootLayout() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="selection:bg-primary-container selection:text-on-primary-container">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-lg text-gray-400">This page does not exist.</p>
      </div>
    </main>
  );
}

function ErrorBoundary() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p className="mt-4 text-lg text-gray-400">Please try again later.</p>
      </div>
    </main>
  );
}
