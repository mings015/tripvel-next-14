import TitleMain from "@/components/content/titleMain";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

const CategorySection = () => {
  return (
    <div className=" mx-auto container px-4">
      <TitleMain
        text="Category"
        sub="Yuk, temukan atraksi ikonik di sekitarmu! Ada banyak diskon menanti.
"
      />

      <div className="px-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/3 lg:basis-1/4 basis-1/2"
              >
                <div className="p-1">
                  <ImageCard imageUrl="https://hips.hearstapps.com/hmg-prod/images/flowers-trees-and-bushes-reach-their-peak-of-full-bloom-in-news-photo-1678292967.jpg?resize=300:*">
                    <CardHeader className="p-2">
                      <CardTitle className="text-center">Category 1</CardTitle>
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
  );
};

export default CategorySection;
