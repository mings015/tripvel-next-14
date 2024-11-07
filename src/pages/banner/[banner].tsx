import Layout from "@/components/Layout";
import useBannerId from "@/hooks/useBanner_id";
import { useRouter } from "next/router";
import React from "react";

const Banner = () => {
  const { data, isLoading, error } = useBannerId();
  const router = useRouter();

  return (
    <Layout>
      <div className="mt-20 container mx-auto px-4">
        {!router.isReady && (
          <div className="mt-20 container mx-auto">
            <div>Initializing...</div>
          </div>
        )}
        {isLoading && <div className="text-center py-8">Loading...</div>}

        {error && <div className="text-center text-red-500 py-8">{error}</div>}

        {data && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{data.name}</h1>

            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={data.imageUrl || "https://placehold.co/600x400/png"}
                alt={data.name}
                className="w-full h-[300px] object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "https://placehold.co/600x400/png";
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Banner;
