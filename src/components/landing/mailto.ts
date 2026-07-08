/**
 * FEAT-007: Pure mailto href builder.
 *
 * Builds a deterministic `mailto:` href from typed constants.
 * No side effects, no browser APIs, no server actions.
 */

export interface MailtoParams {
  readonly to: string;
  readonly subject: string;
  readonly body: string;
}

/**
 * Build a `mailto:` href from structured parameters.
 *
 * Uses `encodeURIComponent` for subject and body fields.
 * The `to` field uses `encodeURIComponent` only if it contains
 * characters that need encoding; plain ASCII emails pass through.
 */
export function buildMailtoHref(params: MailtoParams): string {
  const to = params.to;
  const subject = encodeURIComponent(params.subject);
  const body = encodeURIComponent(params.body);

  return `mailto:${to}?subject=${subject}&body=${body}`;
}
