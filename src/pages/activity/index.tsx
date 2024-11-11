import { CardSkeleton, TableSkeleton } from "@/components/content/Skeleton";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useActivity from "@/components/views/Home/hooks/useActivity";
import { formatToIDR } from "@/helper/convertIDR";
import { ArrowRight, Loader2, MapPin, Star, Users } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

const Activity = () => {
  const router = useRouter();

  const { data, isLoading, error } = useActivity();

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto container items-center justify-center">
          <CardSkeleton />
          <TableSkeleton />
        </div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-500">
            <p className="text-xl font-semibold mb-2">
              Oops! Something went wrong
            </p>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="relative mt-20 h-52 overflow-hidden">
        <img
          src="https://img.freepik.com/free-photo/wet-vietnam-mountain-flow-stream-rural_1417-1357.jpg?t=st=1731054758~exp=1731058358~hmac=200cb015099ae4eb8e61af64caa8c871b4fde4d4852c20075580f0c85f5649c8&w=2000"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = "https://placehold.co/600x400/png";
          }}
          className="w-full h-full object-cover rounded-b-lg mx-auto container"
        />
      </div>
      <Separator className="mt-10 mx-auto container" />

      <div className="my-10 mx-auto container">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              Promo Spesial
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Jelajahi Perjalanan anda
            </h1>
          </div>
          {data.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No activities found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((activity) => (
                <div key={activity.id} className="h-full">
                  <Card className="h-full group ">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={activity.imageUrls}
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
                          <Button
                            variant="neutral"
                            size="sm"
                            className="hover:translate-x-1 transition-transform text-black"
                            onClick={() =>
                              router.push(`/activity/${activity.id}`)
                            }
                          >
                            View Details
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Activity;
