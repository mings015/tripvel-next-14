import Layout from "@/components/Layout";
import useBannerId from "@/hooks/useBanner_id";
import { useRouter } from "next/router";
import React from "react";
import { Calendar, Clock, User, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CardSkeleton } from "@/components/content/Skeleton";

const Banner = () => {
  const { data, isLoading, error } = useBannerId();
  const router = useRouter();

  return (
    <Layout>
      <div className="mt-20 container mx-auto px-4">
        {!router.isReady && (
          <div className="mt-20 container mx-auto">
            <CardSkeleton />
          </div>
        )}
        {isLoading && (
          <div className="text-center py-8">
            <CardSkeleton />
          </div>
        )}

        {error && <div className="text-center text-red-500 py-8">{error}</div>}

        {data && (
          <div className="">
            <article className="container mx-auto py-8 px-4 max-w-4xl">
              <h1 className="text-3xl font-bold mb-4">{data.name}</h1>

              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">Travel Tips</Badge>
                  <Badge variant="secondary">Hotel</Badge>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                  Informasi Jam Check In Hotel dan Check Out yang Wajib
                  Diketahui
                </h1>

                {/* Article Meta */}
                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Tim Editorial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>8 Maret 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>5 menit baca</span>
                  </div>
                </div>

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
              </header>

              <div className="prose max-w-none">
                <p className="lead text-xl text-gray-600 mb-8">
                  Mengetahui jam check in dan check out hotel merupakan hal
                  penting yang perlu diperhatikan saat merencanakan menginap di
                  hotel. Informasi ini akan membantu Anda mengatur jadwal
                  perjalanan dengan lebih baik dan menghindari biaya tambahan
                  yang tidak diinginkan.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                  Jam Check In Hotel Standard
                </h2>
                <p>
                  Pada umumnya, waktu check in di hotel adalah pukul 14.00 waktu
                  setempat. Namun, hal ini bisa berbeda-beda tergantung
                  kebijakan masing-masing hotel. Beberapa hotel menetapkan waktu
                  check in mulai pukul 15.00, sementara yang lain bisa lebih
                  awal yaitu pukul 13.00.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3">Early Check In</h3>
                <p>
                  Jika Anda berencana tiba lebih awal dari jam check in
                  standard, ada beberapa hal yang perlu diketahui:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>
                    Hubungi hotel sebelumnya untuk menanyakan kemungkinan early
                    check in
                  </li>
                  <li>
                    Beberapa hotel mengenakan biaya tambahan untuk early check
                    in
                  </li>
                  <li>Ketersediaan early check in tergantung okupansi hotel</li>
                  <li>
                    Biasanya early check in dimungkinkan jika kamar sudah siap
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                  Jam Check Out Hotel
                </h2>
                <p>
                  Waktu check out standard di kebanyakan hotel adalah pukul
                  12.00 siang. Ini memberikan waktu yang cukup bagi housekeeping
                  untuk mempersiapkan kamar bagi tamu berikutnya.
                </p>

                <h3 className="text-xl font-bold mt-6 mb-3">Late Check Out</h3>
                <p>Untuk late check out, berikut beberapa informasi penting:</p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Perlu konfirmasi dengan pihak hotel terlebih dahulu</li>
                  <li>Biasanya dikenakan biaya tambahan</li>
                  <li>Rate yang dikenakan bisa per jam atau setengah hari</li>
                  <li>
                    Member loyal program hotel sering mendapat privilege late
                    check out gratis
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Tips Penting</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>
                      Selalu konfirmasi jam check in dan check out saat
                      melakukan pemesanan
                    </li>
                    <li>
                      Informasikan ke hotel jika Anda berencana tiba sangat awal
                      atau check out terlambat
                    </li>
                    <li>
                      Manfaatkan layanan penitipan bagasi jika tiba terlalu awal
                      atau punya jadwal perjalanan setelah check out
                    </li>
                    <li>
                      Pertimbangkan untuk memesan kamar dari malam sebelumnya
                      jika Anda tiba sangat pagi
                    </li>
                    <li>
                      Cek benefit member hotel yang mungkin bisa memberikan
                      fleksibilitas waktu check in/out
                    </li>
                  </ol>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">
                  Konsekuensi Keterlambatan Check Out
                </h2>
                <p>
                  Keterlambatan check out tanpa konfirmasi sebelumnya bisa
                  mengakibatkan:
                </p>
                <ul className="list-disc pl-6 mb-6">
                  <li>Dikenakan biaya tambahan</li>
                  <li>Charge satu malam tambahan</li>
                  <li>Mempengaruhi review tamu di sistem hotel</li>
                </ul>

                <div className="bg-blue-50 p-6 rounded-lg my-8">
                  <h3 className="text-xl font-bold mb-3">💡 Pro Tips</h3>
                  <p className="mb-4">
                    Jika Anda sering bepergian untuk bisnis atau memiliki jadwal
                    penerbangan yang tidak sesuai dengan waktu check in/out
                    standard, pertimbangkan untuk:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Mendaftar program membership hotel</li>
                    <li>Memilih hotel yang menawarkan fleksibilitas 24 jam</li>
                    <li>
                      Memanfaatkan fasilitas day use untuk kebutuhan singkat
                    </li>
                  </ul>
                </div>
              </div>

              <Separator className="my-8" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Bagikan artikel:</span>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Hotel</Badge>
                  <Badge variant="outline">Travel Tips</Badge>
                  <Badge variant="outline">Accommodation</Badge>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Banner;
