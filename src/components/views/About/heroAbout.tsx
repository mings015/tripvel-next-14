import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";

const HeroAbout = () => {
  return (
    <div>
      <div className="relative mt-20">
        <div className="absolute inset-0">
          <Image
            src="/image/aboutBanner.jpg"
            layout="fill"
            objectFit="cover"
            quality={90}
            alt="Background"
            className=""
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-[750px] p-7 container mx-auto">
          <h1 className="text-4xl font-extrabold tracking-wide lg:text-6xl text-white text-start pb-5 ">
            Agen Travel online yang menawarkan penerbangan dan hotel, domestik
            dan internasional
          </h1>
          <h2 className="text-xl lg:text-2xl tracking-wide font-medium pt-4 text-white">
            TripVel merupakan platform perjalanan daring di Asia Tenggara yang
            telah berdiri sejak tahun 2024 dan merupakan agen perjalanan daring
            (OTA) pertama di Indonesia yang telah mendapatkan akreditasi IATA
            (International Air Transport Association) dan merupakan anggota
            ASITA - Association of the Indonesia Tours and Travel Agencies.
          </h2>
        </div>
      </div>
      <div className=" mx-auto container my-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <div className="p-8 rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm border-gray-500/20  bg-white font-base py-5 px-8">
            <div className="flex items-center mb-4">
              <Icon icon="noto-v1:person-surfing" className="text-4xl mr-4" />
              <h2 className="text-2xl font-bold">Solusi Anda</h2>
            </div>
            <p className="text-lg">
              Tampilan platform NusaTrip pada situs web dan aplikasi didesain
              secara modern dan ramping untuk menciptakan layanan permesanan
              tiket dan hotel yang menyenangkan dengan berbagai pilihan
              pembayaran.
            </p>
          </div>
          <div className="p-8 rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm border-gray-500/20  bg-white font-base py-5 px-8">
            <div className="flex items-center mb-4">
              <Icon icon="noto:person-bowing" className="text-4xl mr-4" />
              <h2 className="text-2xl font-bold">Kami melayani Anda</h2>
            </div>
            <ul className="list-disc pl-6 text-lg">
              <li className="mb-2">
                Dengan bantuan layanan pelanggan 24/7, kami siap melayani semua
                kebutuhan perjalanan Anda!
              </li>
              <li>
                Harga terbaik kami menyediakan solusi untuk layanan perjalanan
                pribadi dan perjalanan bisnis dengan harga terbaik.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAbout;
