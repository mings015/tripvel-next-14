import TitleMain from "@/components/content/titleMain";
import { CardHeader, CardTitle } from "@/components/ui/cardCustom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageCard from "@/components/ui/imageCard";
import useCategory from "./hooks/useCategory";
import Link from "next/link";
import { CardSkeleton } from "@/components/content/Skeleton";

const CategorySection = () => {
  const { data, isLoading, error } = useCategory();

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
            {isLoading && <CardSkeleton />}
            {error && <div>{error}</div>}
            {data.map((category) => (
              <CarouselItem
                key={category.id}
                className="md:basis-1/3 lg:basis-1/4 basis-1/1"
              >
                <Link href={`category/${category.id}`}>
                  <div className="p-1">
                    <ImageCard imageUrl={category.imageUrl}>
                      <CardHeader className="p-2">
                        <CardTitle className="text-center">
                          {category.name}
                        </CardTitle>
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
  );
};

export default CategorySection;
