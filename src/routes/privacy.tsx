import { createFileRoute } from "@tanstack/react-router";
import { UtilityPageShell } from "~/components/landing/UtilityPageShell";
import { UTILITY_PAGES } from "~/components/landing/constants";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return <UtilityPageShell config={UTILITY_PAGES[0]} />;
}
