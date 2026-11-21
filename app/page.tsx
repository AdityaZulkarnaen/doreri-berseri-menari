import Image from "next/image";
import { LinkHub, type HubLink } from "./link-hub";

// Tambah / hapus menu cukup di sini.
// TODO: ganti "#" dengan URL asli.
const links: HubLink[] = [
  { title: "Booklet Tim Doreri Berseri", url: "https://drive.google.com/file/d/1sd32J_Hj0ZV37KMFu5wXkyQRrI9YQ74S/view?usp=sharing" },
  { title: "RAB", url: "https://docs.google.com/spreadsheets/d/1MlVJcGN_REsIxN9bYxv4esJzE2WY08K5mY0dtWSnGsU/edit?gid=1848094470#gid=1848094470" },
  { title: "CV Anggota", url: "https://drive.google.com/drive/folders/1KGVVDnle0mvABolGVz5wPVPh8d6JIqAX?usp=sharing" },
  { title: "Surat Komitmen", url: "https://drive.google.com/drive/folders/1AEigxdR_QHKIMUHFfkqnqXc0_SQF3Mpl?usp=sharing" },
  { title: "Grand Plan Humas dan Publikasi", url: "https://docs.google.com/spreadsheets/d/1RZkf9b45WXvJ4ekWttKdrkfytQLBSaEnUJymKVVWyRk/edit?usp=drivesdk" },
  { title: "Grand Plan Sponsorship", url: "https://docs.google.com/spreadsheets/d/1blpijwSleFCMqh4GMF7xly-skMkk7F1FTzxxGJ3uCmo/edit?gid=26592462#gid=26592462" },
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
        footerLink={{ title: "Lihat Booklet", url: "https://drive.google.com/file/d/1lN0_GqvlkOaM13XAL0K4moOw1gJnBF-Y/view?usp=sharing" }}
      />
    </main>
  );
}
