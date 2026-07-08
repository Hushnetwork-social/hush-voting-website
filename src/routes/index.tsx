import { createFileRoute } from "@tanstack/react-router";
import "../../styles/app.css";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-on-surface)",
      }}
    >
      <h1
        className="font-bold tracking-tight"
        style={{
          fontFamily: "var(--font-family-hanken)",
          fontSize: "var(--font-size-display-lg)",
          fontWeight: "var(--font-weight-display-lg)",
          lineHeight: "var(--line-height-display-lg)",
          letterSpacing: "var(--letter-spacing-display-lg)",
        }}
      >
        HushVoting!
      </h1>
      <p
        className="mt-4"
        style={{
          fontFamily: "var(--font-family-hanken)",
          fontSize: "var(--font-size-headline-md)",
          fontWeight: "var(--font-weight-headline-md)",
          lineHeight: "var(--line-height-headline-md)",
          color: "var(--color-on-surface-variant)",
        }}
      >
        Governed remote voting for serious organizations
      </p>
      <div
        className="mt-10"
        style={{
          fontFamily: "var(--font-family-jetbrains)",
          fontSize: "var(--font-size-label-md)",
          fontWeight: "var(--font-weight-label-md)",
          letterSpacing: "var(--letter-spacing-label-md)",
          backgroundColor: "var(--color-primary)",
          color: "var(--color-on-primary)",
          padding: "var(--spacing-xs) var(--spacing-sm)",
          borderRadius: "var(--radius-default)",
        }}
      >
        SCAFFOLD READY
      </div>
    </main>
  );
}
