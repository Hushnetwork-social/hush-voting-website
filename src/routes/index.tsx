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
          fontSize: "var(--font-size-display-lg)",
          fontWeight: "var(--font-weight-display-lg)",
          lineHeight: "var(--line-height-display-lg)",
          letterSpacing: "var(--letter-spacing-display-lg)",
        }}
      >
        HushVoting!
      </h1>
      <p
        style={{
          fontSize: "var(--font-size-headline-md)",
          fontWeight: "var(--font-weight-headline-md)",
          lineHeight: "var(--line-height-headline-md)",
          color: "var(--color-on-surface-variant)",
        }}
      >
        Governed remote voting for serious organizations
      </p>
      <div style={{ marginTop: "var(--spacing-lg)" }}>
        <span
          className="px-4 py-2 rounded-lg"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-on-primary)",
            fontSize: "var(--font-size-label-md)",
            fontWeight: "var(--font-weight-label-md)",
            fontFamily: "var(--font-family-jetbrains)",
            letterSpacing: "var(--letter-spacing-label-md)",
          }}
        >
          SCAFFOLD READY
        </span>
      </div>
    </main>
  );
}
