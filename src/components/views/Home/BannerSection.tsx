import TitleMain from "@/components/content/titleMain";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import useBanner from "./hooks/useBanner";
import Link from "next/link";
import { CardSkeleton } from "@/components/content/Skeleton";

const BannerSection = () => {
  const { data, isLoading, error } = useBanner();

  return (
    <div className="mx-auto container px-4">
      <TitleMain
        text="Benner"
        sub="Inspirasi liburan serta rekomendasi tiket, penginapan, transportasi, dan info lain untukmu."
      />

      <div className="">
        <Carousel className="w-full rounded-lg">
          <CarouselContent>
            {isLoading && <CardSkeleton />}
            {error && <div>{error}</div>}
            {data.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="relative p-1">
                  <img
                    src={banner.imageUrl}
                    alt="Picture of the author"
                    className="w-full object-cover max-h-[500px] p-0 rounded-lg"
                  />
                  <div className="absolute bottom-10 right-10">
                    <Link href={`banner/${banner.id}`}>
                      <Button className="hover:scale-105 transition-transform shadow-lg bg-white text-black">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-6" />
          <CarouselNext className="right-6" />
        </Carousel>
      </div>
    </div>
  );
};

export default BannerSection;
