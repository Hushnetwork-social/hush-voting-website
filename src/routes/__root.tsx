import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
});

function RootLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-lg text-gray-400">
          This page does not exist.
        </p>
      </div>
    </main>
  );
}

function ErrorBoundary() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p className="mt-4 text-lg text-gray-400">
          Please try again later.
        </p>
      </div>
    </main>
  );
}
