import { HUSHVOTING_LOGO_SRC } from "./BrandMark";

/**
 * Fixed decorative HushVoting logo backdrop for the public website.
 *
 * The mark is intentionally fixed to the viewport so it stays in the
 * same right-side position while the page scrolls, matching the HushNetwork
 * website treatment without adding another foreground card layer.
 */
export function FixedLogoBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-[clamp(1rem,3vw,3rem)] top-[clamp(7rem,16vh,10rem)] z-0 hidden h-[clamp(20rem,30vw,34rem)] w-[clamp(20rem,30vw,34rem)] select-none lg:block"
    >
      <div className="absolute inset-[12%] rounded-full bg-primary/10 blur-[120px]" />
      <img
        src={HUSHVOTING_LOGO_SRC}
        alt=""
        className="relative h-full w-full object-contain opacity-[0.18] drop-shadow-[0_0_80px_rgba(167,139,250,0.2)]"
        draggable={false}
        width={544}
        height={544}
      />
    </div>
  );
}
