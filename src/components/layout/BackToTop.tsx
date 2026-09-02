import { useEffect, useState } from "react";

/**
 * Floating "back to top" button, bottom-right. Appears after the user
 * scrolls down and smooth-scrolls back up. Hidden until needed so it
 * never blocks content at the top of a page.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-marketplace text-white shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-marketplace-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-marketplace focus-visible:ring-offset-2 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}