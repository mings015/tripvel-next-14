import { CardSkeleton, TableSkeleton } from "@/components/content/Skeleton";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import useActivity from "@/components/views/Home/hooks/useActivity";
import { formatToIDR } from "@/helper/convertIDR";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { ArrowRight, MapPin, Search, Star, Users } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState, useMemo, useEffect } from "react";

const Activity = () => {
  const router = useRouter();
  const breadcrumbItems = useBreadcrumb();
  const { data, isLoading, error } = useActivity();
  const [searchQuery, setSearchQuery] = useState("");

  // Sync URL search parameter with local state
  useEffect(() => {
    const { search } = router.query;
    if (search) {
      setSearchQuery(decodeURIComponent(search as string));
    }
  }, [router.query]);

  // Handle search input change
  const handleSearchChange = (e: any) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);

    // Update URL without triggering a page reload
    const newUrl = newQuery
      ? `/activity?search=${encodeURIComponent(newQuery)}`
      : "/activity";
    router.replace(newUrl, undefined, { shallow: true });
  };

  // Filter data berdasarkan search query
  const filteredData = useMemo(() => {
    if (!data) return [];

    const query = searchQuery.toLowerCase().trim();
    if (!query) return data;

    return data.filter(
      (activity) =>
        activity.title.toLowerCase().includes(query) ||
        activity.city.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

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
          <CustomBreadcrumb items={breadcrumbItems} className="mb-6 flex" />
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              Promo Spesial
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Jelajahi Perjalanan anda
            </h1>

            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Cari berdasarkan judul atau kota..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                {searchQuery
                  ? "Tidak ada aktivitas yang sesuai dengan pencarian Anda"
                  : "Tidak ada aktivitas yang tersedia"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((activity) => (
                <div key={activity.id} className="h-full">
                  <Card className="h-full group">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={activity.imageUrls[0]}
                        alt={activity.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {Number(activity.rating || 0).toFixed(1)}
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
                            Details
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
