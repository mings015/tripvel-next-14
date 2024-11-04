import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";

const HeroSection = () => {
  return (
    <div className="relative">
      <Image
        src="/image/heroimage.jpg"
        width={500}
        height={500}
        alt="Picture of the author"
        className="w-full object-cover h-[750px] pt-20"
        priority
      />
      <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-white overflow-hidden border-black font-base shadow-xl p-7">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-secondaryBlack text-center pb-5">
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
  );
};

export default HeroSection;
