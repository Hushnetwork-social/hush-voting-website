import { cn } from "~/components/ui/cn";
import { ROLE_WORKFLOW_SECTION } from "./constants";

export interface RoleWorkflowSectionProps {
  /** Optional class name for the outer `<section>` element. */
  className?: string;
}

/**
 * Role Workflow section for the homepage.
 *
 * Renders the four HushVoting election roles (Organizations, Voters,
 * Trustees, Auditors) as a responsive grid of static informational cards
 * with decorative Material Symbol icons, role titles, and approved
 * descriptions.
 *
 * Static content only — no interactive state, API calls, or server
 * actions. Cards are non-interactive and unfocusable.
 */
export function RoleWorkflowSection({ className }: RoleWorkflowSectionProps) {
  const { eyebrow, heading, description, roles } = ROLE_WORKFLOW_SECTION;

  return (
    <section
      id="roles"
      aria-labelledby="roles-heading"
      className={cn(
        "section-anchor",
        "relative mx-auto max-w-[var(--spacing-max-width-content)]",
        "px-[var(--spacing-gutter)] py-[var(--spacing-xl)]",
        "max-sm:px-[var(--spacing-margin-mobile)] max-sm:py-[var(--spacing-lg)]",
        className,
      )}
    >
      {/* Section header — eyebrow, heading, description */}
      <div className="mx-auto mb-12 max-w-3xl text-center">
        {eyebrow && (
          <p
            className={cn(
              "mb-2",
              "text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)]",
              "leading-[var(--line-height-label-sm)] tracking-[var(--letter-spacing-label-sm)]",
              "uppercase text-on-surface-variant",
            )}
            style={{ fontFamily: "var(--font-family-jetbrains)" }}
          >
            {eyebrow}
          </p>
        )}

        <h2
          id="roles-heading"
          className={cn(
            "mb-4 font-semibold",
            "text-[clamp(1.5rem,4vw,var(--font-size-headline-lg))]",
            "leading-[clamp(2rem,4.5vw,var(--line-height-headline-lg))]",
          )}
          style={{
            fontFamily: "var(--font-family-hanken)",
          }}
        >
          {heading}
        </h2>

        <p
          className={cn(
            "mx-auto max-w-prose text-on-surface-variant",
            "text-[var(--font-size-body-md)]",
            "leading-[var(--line-height-body-md)]",
          )}
          style={{
            fontFamily: "var(--font-family-hanken)",
          }}
        >
          {description}
        </p>
      </div>

      {/* Role card grid */}
      <div
        className={cn(
          "grid gap-[var(--spacing-md)]",
          "grid-cols-1",
          "sm:grid-cols-2",
          "lg:grid-cols-4",
        )}
      >
        {roles.map((roleCard) => (
          <div
            key={roleCard.role}
            className={cn(
              "flex flex-col",
              "rounded-[var(--radius-lg)]",
              "bg-surface-container-high p-[var(--spacing-md)]",
              "max-sm:p-[var(--spacing-sm)]",
              "transition-colors duration-200",
              "hover:bg-surface-container-highest",
            )}
          >
            {/* Decorative icon */}
            <span
              className={cn(
                "material-symbols-outlined mb-3",
                "text-[calc(var(--font-size-headline-lg)*1.2)]",
                "text-primary",
              )}
              aria-hidden="true"
            >
              {roleCard.icon}
            </span>

            {/* Role title */}
            <h3
              className={cn(
                "mb-2 font-semibold",
                "text-[var(--font-size-headline-sm)]",
                "leading-[var(--line-height-headline-sm)]",
              )}
              style={{ fontFamily: "var(--font-family-hanken)" }}
            >
              {roleCard.role}
            </h3>

            {/* Role description */}
            <p
              className={cn(
                "mt-auto text-on-surface-variant",
                "text-[var(--font-size-body-md)]",
                "leading-[var(--line-height-body-md)]",
              )}
              style={{ fontFamily: "var(--font-family-hanken)" }}
            >
              {roleCard.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
