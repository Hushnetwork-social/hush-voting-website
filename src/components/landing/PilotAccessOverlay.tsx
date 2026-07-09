import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "~/components/ui/cn";
import { PILOT_ACCESS_FORM } from "./constants";

export interface PilotAccessOverlayProps {
  /** Whether the overlay dialog is visible. */
  open: boolean;
  /** Called when the user closes the overlay via button, backdrop, or Escape. */
  onClose: () => void;
  /** Sends the pilot access request. The parent owns server/API wiring. */
  onSubmitRequest: (data: { email: string; message: string }) => Promise<void>;
}

/**
 * Centered pilot access form overlay.
 *
 * This intentionally designs the capture flow only. The submit action does not
 * send network or email traffic yet; it keeps users on-page and shows a clear
 * pending-implementation message until delivery is connected.
 */
export function PilotAccessOverlay({
  open,
  onClose,
  onSubmitRequest,
}: PilotAccessOverlayProps) {
  const titleId = useId();
  const descriptionId = useId();
  const emailId = useId();
  const messageId = useId();
  const [message, setMessage] = useState<string>(
    PILOT_ACCESS_FORM.defaultMessage,
  );
  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  const overlay = (
    <div
      data-testid="pilot-access-overlay-backdrop"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-surface-container-lowest/80 px-[var(--spacing-gutter)] backdrop-blur-md",
        "max-sm:px-[var(--spacing-margin-mobile)]",
      )}
      onMouseDown={onClose}
      role="presentation"
    >
      <form
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className={cn(
          "relative max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto",
          "rounded-[var(--radius-xl)] bg-surface-container p-[var(--spacing-lg)]",
          "shadow-[0_24px_90px_rgba(0,0,0,0.45)]",
          "max-sm:p-[var(--spacing-md)]",
        )}
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitError("");
          setIsSubmitting(true);
          void onSubmitRequest({ email, message })
            .then(() => {
              onClose();
              setEmail("");
              setMessage(PILOT_ACCESS_FORM.defaultMessage);
            })
            .catch(() => {
              setSubmitError(
                "We could not send the request right now. Please try again in a moment.",
              );
            })
            .finally(() => setIsSubmitting(false));
        }}
        role="dialog"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_62%)] opacity-[0.09]"
        />

        <div className="relative z-10">
          <button
            type="button"
            aria-label={PILOT_ACCESS_FORM.closeButtonLabel}
            className={cn(
              "absolute right-0 top-0 inline-flex h-11 w-11 items-center justify-center",
              "rounded-[var(--radius-default)] bg-surface-container-high text-on-surface-variant",
              "hover:bg-surface-container-highest hover:text-on-surface",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container",
              "transition-colors",
            )}
            onClick={onClose}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>

          <p
            className={cn(
              "mb-2 pr-14 text-[var(--font-size-label-sm)] font-[var(--font-weight-label-sm)]",
              "leading-[var(--line-height-label-sm)] tracking-[var(--letter-spacing-label-sm)]",
              "uppercase text-primary",
            )}
            style={{ fontFamily: "var(--font-family-jetbrains)" }}
          >
            Pilot access
          </p>

          <h2
            id={titleId}
            className={cn(
              "mb-3 pr-14 font-semibold",
              "text-[clamp(1.75rem,4vw,var(--font-size-headline-lg))]",
              "leading-[clamp(2.25rem,4.5vw,var(--line-height-headline-lg))]",
            )}
            style={{ fontFamily: "var(--font-family-hanken)" }}
          >
            {PILOT_ACCESS_FORM.dialogTitle}
          </h2>

          <p
            id={descriptionId}
            data-testid="pilot-access-overlay-intro"
            className="mb-8 w-full max-w-[36rem] text-[var(--font-size-body-md)] leading-[var(--line-height-body-md)] text-on-surface-variant"
          >
            {PILOT_ACCESS_FORM.intro}
          </p>

          <div className="grid gap-[var(--spacing-md)] text-left">
            <label className="grid gap-2" htmlFor={emailId}>
              <span className="text-[var(--font-size-label-md)] font-medium text-on-surface">
                {PILOT_ACCESS_FORM.emailLabel}
              </span>
              <input
                id={emailId}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={cn(
                  "min-h-12 rounded-[var(--radius-default)] bg-surface-container-high px-4 py-3",
                  "text-on-surface placeholder:text-on-surface-variant/70",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                )}
              />
            </label>

            <label className="grid gap-2" htmlFor={messageId}>
              <span className="text-[var(--font-size-label-md)] font-medium text-on-surface">
                {PILOT_ACCESS_FORM.messageLabel}
              </span>
              <textarea
                id={messageId}
                name="message"
                rows={5}
                maxLength={PILOT_ACCESS_FORM.messageMaxLength}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className={cn(
                  "resize-y rounded-[var(--radius-default)] bg-surface-container-high px-4 py-3",
                  "text-on-surface placeholder:text-on-surface-variant/70",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                )}
              />
            </label>

            <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
              <p
                className="text-[var(--font-size-label-sm)] leading-[var(--line-height-label-sm)] text-on-surface-variant"
                aria-live="polite"
              >
                {message.length}/{PILOT_ACCESS_FORM.messageMaxLength} characters
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "disabled:cursor-not-allowed disabled:opacity-70",
                  "inline-flex min-h-12 items-center justify-center rounded-[var(--radius-default)]",
                  "bg-primary px-7 py-3 text-base font-medium text-on-primary",
                  "hover:brightness-110 active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container",
                  "transition-all",
                )}
              >
                {isSubmitting ? "Sending…" : PILOT_ACCESS_FORM.sendButtonLabel}
              </button>
            </div>

            {submitError && (
              <p
                className="rounded-[var(--radius-default)] bg-error-container px-4 py-3 text-[var(--font-size-body-md)] leading-[var(--line-height-body-md)] text-on-error-container"
                role="alert"
              >
                {submitError}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );

  return createPortal(overlay, document.body);
}
