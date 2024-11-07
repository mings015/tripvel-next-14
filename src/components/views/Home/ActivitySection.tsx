import TitleMain from "@/components/content/titleMain";
import Image from "next/image";
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
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {data.map((activity) => (
              <CarouselItem
                key={activity.id}
                className="sm:basis-1/2 lg:basis-1/3 basis-1/1"
              >
                <Link href={`activity/${activity.id}`}>
                  <div className="p-1">
                    <div
                      key={activity.id}
                      className="bg-white rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm border-gray-500/20"
                    >
                      <div className="h-52">
                        <img
                          src={activity.imageUrls}
                          alt={activity.title}
                          width={200}
                          height={160}
                          style={{ height: "100%", width: "100%" }}
                          className="mx-auto mb-4 rounded-t-xl object-cover"
                        />
                      </div>
                      <div className="p-3 flex flex-col gap-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {activity.title}
                        </h3>
                        <h3 className="text-sm">{activity.city}</h3>

                        <div className="flex text-sm">
                          <span className="text-yellow-500 mr-1">
                            {"\u2605".repeat(Math.floor(activity.rating))}
                          </span>
                          <span className="text-gray-500">
                            ({activity.total_reviews} Review)
                          </span>
                        </div>
                        <p className="text-green-600 font-semibold text-lg mb-4">
                          {formatToIDR(activity.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <h2 className="text-sm font-medium pt-4 text-slate-600 flex gap-2 justify-center items-center">
        Lihat selengkapnya
        <span>
          <Icon icon="ep:arrow-down" />
        </span>
      </h2>
    </div>
  );
};

export default ActivitySection;
