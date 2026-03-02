import Image from "next/image";

export function Footer(): React.ReactElement {
  return (
    <footer className="mt-24 border-t border-navy-light px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <Image
            src="/klysera.svg"
            alt="Klysera"
            width={120}
            height={24}
            className="h-6 w-auto opacity-90"
          />
          <span className="text-[10px] tracking-[0.3em] text-body-muted">
            SKILL BANK
          </span>
        </div>
        <p className="text-xs tracking-wide text-body-muted">
          Klysera R&D &mdash; 2026
        </p>
      </div>
    </footer>
  );
}
