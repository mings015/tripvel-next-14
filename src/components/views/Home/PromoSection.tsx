import TitleMain from "@/components/content/titleMain";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cardCustom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageCard from "@/components/ui/imageCard";

import React from "react";

const PromoSection = () => {
  return (
    <div className="mt-36 mx-auto container px-4">
      <TitleMain
        text="Promo ⚡"
        sub="Nikmati berbagai voucher ekstra, spesial untukmu."
      />
      <div className="relative bg-slate-200 rounded-2xl p-6 shadow-lg">
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-12 bg-white rounded-r-full" />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-12 bg-white rounded-l-full" />
        <div className="flex flex-col gap-4 md:flex-row  p-5 rounded-base">
          <div className="md:w-1/3 w-full justify-center flex flex-col gap-2">
            <h4 className="text-2xl font-semibold tracking-tight">
              Nikmati promo hingga 80%
            </h4>
            <p>
              membuat perjalanan mu lebih stabil dan kantong menjadi bersahabat
            </p>
          </div>
          <div className="px-10 md:w-2/3 w-full">
            <Carousel
              opts={{
                align: "start",
              }}
              className=""
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <ImageCard imageUrl="https://hips.hearstapps.com/hmg-prod/images/flowers-trees-and-bushes-reach-their-peak-of-full-bloom-in-news-photo-1678292967.jpg?resize=300:*">
                        <CardHeader className="p-2">
                          <CardTitle>Beli 1 Gratis 1</CardTitle>
                          <CardDescription>
                            Minimal Belanja 100K
                          </CardDescription>
                        </CardHeader>
                      </ImageCard>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
