import TitleMain from "@/components/content/titleMain";
import { Icon } from "@iconify/react";
import useActivity from "./hooks/useActivity";
import { formatToIDR } from "@/helper/convertIDR";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users } from "lucide-react";
import { CardSkeleton } from "@/components/content/Skeleton";

const ActivitySection = () => {
  const { data, isLoading, error } = useActivity();

  return (
    <div className=" mx-auto container px-4">
      <TitleMain
        text="Activity"
        sub="Temukan yang kamu suka di Asia hingga dunia"
      />
      <div className="px-10 ">
        <Carousel
          opts={{
            align: "start",
          }}
          className=""
        >
          <CarouselContent>
            {isLoading && <CardSkeleton />}
            {error && <div>{error}</div>}
            {data.map((activity) => (
              <CarouselItem
                key={activity.id}
                className="sm:basis-1/2 lg:basis-1/3 basis-1/1"
              >
                <Link href={`activity/${activity.id}`}>
                  <Card className="h-full group ">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={activity.imageUrls[0]}
                        alt={activity.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {activity.rating.toFixed(1)}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-auto">
                          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                            {activity.title}
                          </h3>
                          <div className="flex items-center text-gray-500 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{activity.city}</span>
                          </div>
                          <div className="flex items-center text-gray-500 mb-4">
                            <Users className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {activity.total_reviews} Reviews
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <p className="text-green-600 font-semibold text-xl">
                            {formatToIDR(activity.price)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Link href="/activity">
        <h2 className="text-base font-medium pt-4 text-slate-600 flex gap-2 justify-center items-center">
          Lihat selengkapnya
          <span>
            <Icon icon="ep:arrow-down" />
          </span>
        </h2>
      </Link>
    </div>
  );
};

export default ActivitySection;
