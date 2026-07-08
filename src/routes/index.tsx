import { createFileRoute } from "@tanstack/react-router";
import { Header } from "~/components/landing/Header";
import { HeroSection } from "~/components/landing/HeroSection";
import "../../styles/app.css";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
