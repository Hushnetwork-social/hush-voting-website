import { createFileRoute } from "@tanstack/react-router";
import { UtilityPageShell } from "~/components/landing/UtilityPageShell";
import { UTILITY_PAGES } from "~/components/landing/constants";

export const Route = createFileRoute("/security")({
  component: SecurityPage,
});

function SecurityPage() {
  return <UtilityPageShell config={UTILITY_PAGES[2]} />;
}
