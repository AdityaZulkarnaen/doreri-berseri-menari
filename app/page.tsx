import Image from "next/image";
import { LinkHub, type HubLink } from "./link-hub";

// Tambah / hapus menu cukup di sini.
// TODO: ganti "#" dengan URL asli.
const links: HubLink[] = [
  { title: "Booklet Tim Doreri Berseri", url: "#" },
  { title: "RAB", url: "#" },
  { title: "Program Kerja", url: "#" },
  { title: "CV Anggota", url: "#" },
  { title: "Surat Komitmen", url: "#" },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full items-start justify-center selection:bg-ocean selection:text-white sm:px-4 sm:py-6 md:py-10">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <Image
          src="/bg.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <LinkHub
        name="Doreri Berseri"
        kkn="KKN Manokwari Menari"
        tagline="Selamat Datang di Tanah Manokwari"
        // avatar="/avatar.webp"
        links={links}
        // footerLink={{ title: "Lihat Booklet", url: "#" }}
      />
    </main>
  );
}
