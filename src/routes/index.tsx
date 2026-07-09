import { createFileRoute } from "@tanstack/react-router";
import { FixedLogoBackdrop } from "~/components/landing/FixedLogoBackdrop";
import { Header } from "~/components/landing/Header";
import { HeroSection } from "~/components/landing/HeroSection";
import { TrustModelSection } from "~/components/landing/TrustModelSection";
import { RoleWorkflowSection } from "~/components/landing/RoleWorkflowSection";
import { ProtocolEvidenceSection } from "~/components/landing/ProtocolEvidenceSection";
import { PlatformReadinessSection } from "~/components/landing/PlatformReadinessSection";
import { FinalCtaSection } from "~/components/landing/FinalCtaSection";
import { Footer } from "~/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      <FixedLogoBackdrop />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <TrustModelSection />
        <RoleWorkflowSection />
        <ProtocolEvidenceSection />
        <PlatformReadinessSection />
        <FinalCtaSection />
      </main>
      <Footer className="relative z-10" />
    </div>
  );
}
