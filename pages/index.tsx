import Image from "next/image";
import { Inter } from "next/font/google";
import ScrollTest from "@/components/ScrollTest";
import ArtistLink from "@/components/ArtistLink";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className={`w-full h-full overflow-hidden hideScroll ${inter.className}`}
    >
      <div className="fixed top-[16px] left-[16px] z-50">
        <Header></Header>
      </div>
      <div className="fixed bottom-[93px] right-[155px] z-50">
        <ArtistLink></ArtistLink>
      </div>
      <ScrollTest></ScrollTest>
    </div>
  );
}
