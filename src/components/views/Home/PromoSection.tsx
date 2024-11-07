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
import usePromo from "./hooks/usePromo";
import Link from "next/link";
import { getImageUrl } from "@/helper/defaultImg";

const PromoSection = () => {
  const { data, isLoading, error } = usePromo();
  return (
    <div className="mt-36 mx-auto container px-4">
      <TitleMain
        text="Promo ⚡"
        sub="Nikmati berbagai voucher ekstra, spesial untukmu."
      />
      <div className="relative bg-slate-200 rounded-2xl p-6 shadow-lg">
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-12 bg-white rounded-r-full" />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-12 bg-white rounded-l-full" />
        <div className="flex flex-col gap-4 md:flex-row p-5 rounded-base">
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
                {isLoading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {data.map((promo) => (
                  <CarouselItem
                    key={promo.id}
                    className="sm:basis-1/2 lg:basis-1/3 basis-1/1"
                  >
                    <Link href={`promo/${promo.id}`}>
                      <div className="p-1">
                        <ImageCard imageUrl={getImageUrl(promo.imageUrl)}>
                          <CardHeader className="p-2 h-32">
                            <CardTitle>{promo.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                              {promo.description}
                            </CardDescription>
                          </CardHeader>
                        </ImageCard>
                      </div>
                    </Link>
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
