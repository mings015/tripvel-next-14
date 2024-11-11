import React from "react";
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import { formatToIDR } from "@/helper/convertIDR";
import useActivityCategory from "@/hooks/useActivity_category";
import useCaregoryId from "@/hooks/useCategory_id";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Category = () => {
  const { data, isLoading, error } = useCaregoryId();
  const { dataActivity, isLoadingActivity, errorActivity } =
    useActivityCategory();
  const router = useRouter();

  if (!router.isReady) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Initializing...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading || isLoadingActivity) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading amazing activities...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || errorActivity) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-500">
            <p className="text-xl font-semibold mb-2">
              Oops! Something went wrong
            </p>
            <p>{error || errorActivity}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mt-20 container mx-auto px-4 pb-10">
        {data && (
          <div className="relative mb-12">
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src={data.imageUrl || "https://placehold.co/600x400/png"}
                alt={data.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "https://placehold.co/600x400/png";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <Badge className="mb-4" variant="secondary">
                  Category
                </Badge>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {data.name}
                </h1>
                <p className="text-gray-200">
                  Discover amazing activities in this category
                </p>
              </div>
            </div>
          </div>
        )}

        <Separator className="my-8" />

        {dataActivity.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No activities found in this category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataActivity.map((activity) => (
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
    </Layout>
  );
};

export default Category;
