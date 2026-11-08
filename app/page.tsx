import Image from "next/image";
import { LinkHub, type HubLink } from "./link-hub";

// Tambah / hapus menu cukup di sini.
// TODO: ganti "#" dengan URL asli.
const links: HubLink[] = [
  { title: "Booklet Tim Doreri Berseri", url: "https://docs.google.com/document/d/1-fpF1hzHJu3wscroE4YctnDJJUPMaMfNEfBqdpCdwJw/edit?usp=sharing" },
  { title: "RAB", url: "https://docs.google.com/spreadsheets/d/1_q6KglF5ekzRGTGaVKeAf_5Tn1UHoS7JjyBL82Rqbuk/edit?usp=sharing" },
  { title: "CV Anggota", url: "https://drive.google.com/drive/folders/1KGVVDnle0mvABolGVz5wPVPh8d6JIqAX?usp=sharing" },
  { title: "Surat Komitmen", url: "https://drive.google.com/drive/folders/1AEigxdR_QHKIMUHFfkqnqXc0_SQF3Mpl?usp=sharing" },
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
        kkn="KKN Manokwari Menari 2027"
        tagline="Selamat Datang di Bumi Manokwari"
        avatar="/logo.webp"
        links={links}
        footerLink={{ title: "Lihat Booklet", url: "#" }}
      />
    </main>
  );
}
