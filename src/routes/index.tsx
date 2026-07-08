import { createFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/landing/Header";
import { HeroSection } from "~/components/landing/HeroSection";
import { TrustModelSection } from "~/components/landing/TrustModelSection";
import { RoleWorkflowSection } from "~/components/landing/RoleWorkflowSection";
import { ProtocolEvidenceSection } from "~/components/landing/ProtocolEvidenceSection";
import { PlatformReadinessSection } from "~/components/landing/PlatformReadinessSection";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustModelSection />
        <RoleWorkflowSection />
        <ProtocolEvidenceSection />
        <PlatformReadinessSection />
      </main>
    </>
  );
}
