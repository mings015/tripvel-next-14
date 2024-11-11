import Layout from "@/components/Layout";
import usePromoId from "@/hooks/usePromo_id";
import { useRouter } from "next/router";
import { Calendar, Clock, Copy, Share2, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatToIDR } from "@/helper/convertIDR";

const PromoDetail = () => {
  const { data, isLoading, error } = usePromoId();
  const router = useRouter();
  const copyPromoCode = () => {
    navigator.clipboard.writeText(data!.promo_code);
    toast({
      title: "Kode promo disalin!",
      description: "Kode promo telah disalin ke clipboard.",
    });
  };

  const createMarkup = (htmlContent: string) => {
    return {
      __html: htmlContent,
    };
  };

  if (!router.isReady) {
    return (
      <Layout>
        <div className="mt-20 container mx-auto">
          <div>Initializing...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mt-20 container mx-auto px-6">
        {isLoading && <div className="text-center py-8">Loading...</div>}

        {error && <div className="text-center text-red-500 py-8">{error}</div>}

        {data && (
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4">
                Promo Spesial
              </Badge>
              <h1 className="text-4xl font-bold mb-4">
                Nikmati Promo {data.title}
              </h1>

              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Berlaku hingga 31 Maret 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>Promo Terbatas</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden mb-8 shadow-lg">
              <img
                src={data.imageUrl || "https://placehold.co/600x400/png"}
                alt={data.title}
                className="w-full h-[400px]"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "https://placehold.co/600x400/png";
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                      Deskripsi Promo
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {data.description}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-1">
                <Card className="bg-blue-400 text-white">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">Kode Promo</h3>
                      <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm mb-4">
                        <p className="text-2xl font-bold tracking-wider">
                          {data.promo_code.toUpperCase()}
                        </p>
                      </div>
                      <Button
                        variant="neutral"
                        className="w-full text-black"
                        onClick={copyPromoCode}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Salin Kode
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="mb-8 bg-gray-50">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Nilai Diskon</h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <p className="text-2xl font-bold text-green-600">
                        {formatToIDR(data.promo_discount_price)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Potongan langsung
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Minimum Transaksi
                    </h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatToIDR(data.minimum_claim_price)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Minimum pembelian
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Syarat dan Ketentuan
                </h2>
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={createMarkup(data.terms_condition)}
                />
              </CardContent>
            </Card>

            <div className="flex items-center justify-between py-6 border-t">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Bagikan promo:</span>
                <Button variant="variant" className="text-black" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              <Link href="/activity">
                <Button variant="default">Gunakan Promo</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PromoDetail;
