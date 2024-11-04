import TitleMain from "@/components/content/titleMain";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import Image from "next/image";

const BannerSection = () => {
  return (
    <div className="mx-auto container px-4">
      <TitleMain
        text="Benner"
        sub="Inspirasi liburan serta rekomendasi tiket, penginapan, transportasi, dan info lain untukmu.
"
      />

      <div className="">
        <Carousel className="w-full rounded-lg">
          <CarouselContent>
            <CarouselItem>
              <div className="relative p-1">
                <Image
                  src="/image/img-login.png"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className="w-full object-cover max-h-[500px] p-0 rounded-lg"
                  priority
                />
                <div className="absolute bottom-10 right-10">
                  <Button className="hover:scale-105 transition-transform shadow-lg bg-white text-black">
                    Baca Selengkapnya
                  </Button>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem className="">
              <div className="relative p-1">
                <Image
                  src="/image/heroimage.jpg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className="w-full object-cover max-h-[500px] p-0 rounded-lg"
                  priority
                />
                <div className="absolute bottom-10 right-10">
                  <Button className="hover:scale-105 transition-transform shadow-lg bg-white text-black">
                    Baca Selengkapnya
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-6" />
          <CarouselNext className="right-6" />
        </Carousel>
      </div>
    </div>
  );
};

export default BannerSection;
