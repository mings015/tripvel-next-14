import React from "react";
import Layout from "@/components/Layout";
import useActivityId from "@/hooks/useActivity_id";
import { useRouter } from "next/router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Star, Building, DollarSign } from "lucide-react";
import { formatToIDR } from "@/helper/convertIDR";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import AddToCartButton from "@/components/views/Cart/AddToCartButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ActivityDetail = () => {
  const { user } = useUser();

  const { data, isLoading, error } = useActivityId();
  const router = useRouter();
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  if (!router.isReady) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin">⏳</div>
          <span className="ml-2">Initializing...</span>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin">🔄</div>
          <span className="ml-2">Loading amazing activity...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-red-500">
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mt-20 container mx-auto px-4 pb-12">
        {data && (
          <>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-2/3">
                  <div className="rounded-xl overflow-hidden">
                    <Carousel className="">
                      <CarouselContent>
                        {data?.imageUrls.map((imageUrls) => (
                          <CarouselItem key={imageUrls}>
                            <img
                              src={imageUrls.trim()}
                              alt={`${data.title}`}
                              className="w-full h-[500px] object-cover"
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.src = "https://placehold.co/600x400/png";
                              }}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-6" />
                      <CarouselNext className="right-6" />
                    </Carousel>
                  </div>
                </div>

                <div className="md:w-1/3">
                  <Card>
                    <CardContent className="p-6">
                      <Badge className="mb-4" variant="secondary">
                        {data.category.name}
                      </Badge>
                      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span className="font-bold ml-1">{data.rating}</span>
                        </div>
                        <span className="text-gray-500">
                          ({data.total_reviews.toLocaleString()} reviews)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-600 mb-6">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {data.city}, {data.province}
                        </span>
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Regular Price</span>
                          <span className="text-lg font-semibold">
                            {formatToIDR(data.price)}
                          </span>
                        </div>

                        {data.price_discount && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">
                              Discount Price
                            </span>
                            <span className="text-lg font-semibold text-green-600">
                              {formatToIDR(data.price_discount)}
                            </span>
                          </div>
                        )}
                      </div>
                      {!user ? (
                        <Link href="/login">
                          <Button className="w-full mt-6">Add to cart</Button>
                        </Link>
                      ) : (
                        <AddToCartButton
                          activityId={data.id}
                          activityTitle={data.title}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-4">
                        Description
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {data.description}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-4">
                        Facilities
                      </h2>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={createMarkup(data.facilities)}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-4">Location</h2>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                          <p className="text-gray-600">{data.address}</p>
                        </div>
                        <div
                          className="w-full rounded-xl overflow-hidden"
                          dangerouslySetInnerHTML={createMarkup(
                            data.location_maps
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-1">
                  <Card className="sticky top-24">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">
                        Quick Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Category</p>
                            <p className="text-gray-600">
                              {data.category.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Location</p>
                            <p className="text-gray-600">
                              {data.city}, {data.province}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Rating</p>
                            <p className="text-gray-600">{data.rating} / 5</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">Price</p>
                            <p className="text-gray-600">
                              {formatToIDR(data.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ActivityDetail;
