"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type HubLink = {
  title: string;
  url: string;
};

type LinkHubProps = {
  name: string;
  kkn: string;
  tagline?: string;
  /** Path gambar di /public, mis. "/avatar.webp". Kosongkan untuk inisial. */
  avatar?: string;
  links: HubLink[];
  footerLink?: HubLink;
};

async function shareOrCopy(title: string, url: string): Promise<"shared" | "copied" | "failed"> {
  try {
    if (navigator.share) {
      await navigator.share({ title, url });
      return "shared";
    }
  } catch (err) {
    if ((err as DOMException)?.name === "AbortError") return "failed";
  }
  try {
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    return "failed";
  }
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function LinkItem({ link, onToast }: { link: HubLink; onToast: (msg: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const copy = async () => {
    setOpen(false);
    try {
      await navigator.clipboard.writeText(link.url);
      onToast("Tautan disalin");
    } catch {
      onToast("Gagal menyalin tautan");
    }
  };

  const share = async () => {
    setOpen(false);
    const res = await shareOrCopy(link.title, link.url);
    if (res === "copied") onToast("Tautan disalin");
  };

  return (
    <li ref={ref} className={`relative w-full transition-transform duration-200 hover:-translate-y-0.5 ${open ? "z-20" : ""}`}>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[58px] w-full items-center justify-center rounded-3xl bg-ocean px-14 py-3.5 text-center text-[13.5px] leading-snug font-bold tracking-wide text-white uppercase shadow-md transition-all duration-300 hover:bg-ocean-deep hover:shadow-xl active:scale-[0.98] sm:text-[14.5px]"
      >
        {link.title}
      </a>
      <button
        type="button"
        title="Opsi Tautan"
        aria-label={`Opsi tautan ${link.title}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
      >
        <DotsIcon />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute top-full right-2 mt-2 w-44 overflow-hidden rounded-2xl bg-white py-1 text-sm text-slate-800 shadow-xl"
        >
          <button role="menuitem" type="button" onClick={copy} className="block w-full cursor-pointer px-4 py-2.5 text-left hover:bg-slate-100">
            Salin tautan
          </button>
          <button role="menuitem" type="button" onClick={share} className="block w-full cursor-pointer px-4 py-2.5 text-left hover:bg-slate-100">
            Bagikan
          </button>
        </div>
      )}
    </li>
  );
}

export function LinkHub({ name, kkn, tagline, avatar, links, footerLink }: LinkHubProps) {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const sharePage = async () => {
    const res = await shareOrCopy(`${name} – ${kkn}`, window.location.href);
    if (res === "copied") setToast("Tautan halaman disalin");
  };

  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative flex min-h-screen w-full max-w-[580px] flex-col bg-[#0b2a3f]/25 px-4 py-6 backdrop-blur-xl sm:min-h-[92vh] sm:rounded-[36px] sm:px-7 sm:py-8 sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/20 via-white/5 to-transparent sm:rounded-t-[36px]" />

      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="mb-4 flex w-full items-center justify-end">
          <button
            type="button"
            title="Bagikan Halaman"
            aria-label="Bagikan Halaman"
            onClick={sharePage}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/30 text-white/90 shadow-md backdrop-blur-md transition-all hover:bg-black/50 hover:text-white active:scale-95"
          >
            <ShareIcon />
          </button>
        </div>

        <header className="mt-1 mb-6 flex flex-col items-center text-center">
          {avatar ? (
            <Image
              src={avatar}
              alt={`Logo ${name}`}
              width={112}
              height={112}
              className="h-24 w-24 rounded-full border-2 border-white/40 object-cover shadow-xl sm:h-28 sm:w-28"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/40 bg-ocean text-3xl font-extrabold shadow-xl sm:h-28 sm:w-28"
            >
              {initials}
            </div>
          )}
          <h1 className="mt-3.5 text-2xl font-extrabold drop-shadow-md sm:text-[26px]">{name}</h1>
          <p className="mt-1 rounded-full bg-white px-3 py-0.5 text-[11px] font-semibold tracking-wide text-ocean">{kkn}</p>
          {tagline && (
            <p className="mt-1 max-w-[340px] px-2 text-[15px] leading-relaxed font-medium text-white/95 drop-shadow-sm sm:text-[18px]">
              {tagline}
            </p>
          )}
        </header>

        <ul className="mt-1 w-full space-y-3.5">
          {links.map((link) => (
            <LinkItem key={link.url + link.title} link={link} onToast={setToast} />
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-8" />
      <footer className="relative z-10 flex items-center justify-center gap-2 pb-2 text-[12px] text-white/85">
        <span>KKN {name}</span>
        {footerLink && (
          <>
            <span aria-hidden="true">•</span>
            <a href={footerLink.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline">
              {footerLink.title}
            </a>
          </>
        )}
      </footer>

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-sm text-white shadow-lg transition-opacity duration-200 ${toast ? "opacity-100" : "opacity-0"}`}
      >
        {toast}
      </div>
    </div>
  );
}
