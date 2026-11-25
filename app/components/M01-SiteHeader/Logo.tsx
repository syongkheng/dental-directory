// M01 Logo mark (neutral monogram until PDCA supplies its logo files — TBC).
export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="11" fill="var(--brand)" />
      <path
        d="M13 28V12h7.2c3.6 0 5.8 2 5.8 5.1s-2.2 5.1-5.8 5.1H16.6V28H13Zm3.6-8.9h3.3c1.6 0 2.5-.8 2.5-2s-.9-2-2.5-2h-3.3v4Z"
        fill="#fff"
      />
    </svg>
  );
}
