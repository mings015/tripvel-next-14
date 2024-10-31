import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";

import Image from "next/image";

const image = [
  {
    src: "/image/heroimage.jpg",
    alt: "Image 1",
  },
  {
    src: "/image/heroimage.jpg",
    alt: "Image 1",
  },
  {
    src: "/image/heroimage.jpg",
    alt: "Image 1",
  },
];

export default function Home() {
  return (
    <Layout>
      <div className="relative">
        <Image
          src={image[0].src}
          width={500}
          height={500}
          alt="Picture of the author"
          className="w-full object-cover h-[750px] pt-20"
          priority
        />
        <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2">
          <div className="container mx-auto px-4">
            <div className="rounded-xl bg-white overflow-hidden border-black font-base shadow-xl p-10">
              <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-secondaryBlack text-center">
                Halo, Perjalanan Anda Dimulai Dari Sini
              </h1>
              <div className="flex w-full gap-2 my-5">
                <div className="w-full">
                  <Input
                    type="text"
                    placeholder="Cari tujuan perjalanan mu"
                    className="w-full text-lg h-14"
                  />
                </div>
                <div className="w-1/5">
                  <Button type="submit" className="w-full h-14 text-lg">
                    Cari
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <p className="flex gap-2 justify-center items-center">
                  <span>
                    <Icon icon="fluent-color:shield-checkmark-28" />
                  </span>
                  Transaksi aman |
                </p>
                <p className="flex gap-2 justify-center items-center">
                  <span>
                    <Icon icon="flat-color-icons:callback" />
                  </span>
                  Bantuan 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-36 mx-auto container">halo</div>
    </Layout>
  );
}
