import Image from "next/image";
import { Inter } from "next/font/google";
import Gallery from "@/components/Gallery";
import ArtistLink from "@/components/ArtistLink";
import Header from "@/components/Header";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [inViewImages, setInViewImages] = useState({
    now: 0,
    prev: 4,
  });

  return (
    <div
      className={`w-full h-full overflow-hidden hideScroll ${inter.className}`}
    >
      <div className="fixed top-[16px] left-[16px] z-50">
        <Header></Header>
      </div>
      <div className="fixed bottom-[93px] right-[155px] z-50">
        <ArtistLink inViewImage={inViewImages.now}></ArtistLink>
      </div>
      <Gallery
        inViewImages={inViewImages}
        setInViewImages={setInViewImages}
      ></Gallery>
    </div>
  );
}
