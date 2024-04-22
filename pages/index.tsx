import Image from "next/image";
import { Inter } from "next/font/google";
import ScrollTest from "@/components/ScrollTest";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={` ${inter.className}`}>
      <ScrollTest></ScrollTest>
    </div>
  );
}
