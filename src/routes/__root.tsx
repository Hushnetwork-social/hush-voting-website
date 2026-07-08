import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <div>Page not found</div>,
});

function RootLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
