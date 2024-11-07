import Layout from "@/components/Layout";
import usePromoId from "@/hooks/usePromo_id";
import { useRouter } from "next/router";

const PromoDetail = () => {
  const { data, isLoading, error } = usePromoId();
  const router = useRouter();

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
      <div className="mt-20 container mx-auto px-4">
        {isLoading && <div className="text-center py-8">Loading...</div>}

        {error && <div className="text-center text-red-500 py-8">{error}</div>}

        {data && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

            <div className="rounded-lg overflow-hidden mb-6">
              <img
                src={data.imageUrl || "https://placehold.co/600x400/png"}
                alt={data.title}
                className="w-full h-[300px] object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "https://placehold.co/600x400/png";
                }}
              />
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Deskripsi Promo</h2>
              <p className="text-gray-700">{data.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Kode Promo</h3>
                  <div className="bg-white p-3 rounded border">
                    {data.promo_code}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Diskon</h3>
                  <div className="bg-white p-3 rounded border">
                    Rp {data.promo_discount_price.toLocaleString("id-ID")}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Minimum Pembelian</h3>
                  <div className="bg-white p-3 rounded border">
                    Rp {data.minimum_claim_price.toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Syarat dan Ketentuan
              </h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={createMarkup(data.terms_condition)}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PromoDetail;
