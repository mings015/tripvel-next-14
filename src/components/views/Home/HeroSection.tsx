import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const HeroSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/activity?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative">
      <Image
        src="/image/heroimage.webp"
        alt="Landscape view"
        width={500}
        height={500}
        className="w-full object-cover pt-20 h-[47rem]"
        sizes="100vw"
        loading="eager" // Pastikan loading prioritas
      />
      <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-white overflow-hidden border-black font-base shadow-xl p-7">
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl text-secondaryBlack text-center pb-5">
              Halo, Perjalanan Anda Dimulai Dari Sini
            </h1>
            <form onSubmit={handleSearch} className="flex w-full gap-2 my-5">
              <div className="w-full">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari tujuan perjalanan mu"
                  className="w-full text-lg h-14"
                />
              </div>
              <div className="w-1/5">
                <Button type="submit" className="w-full h-14 text-lg">
                  Cari
                </Button>
              </div>
            </form>
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
