import TitleMain from "@/components/content/titleMain";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";

const WhySection = () => {
  return (
    <div className=" mx-auto container px-4">
      <TitleMain
        text="Kenapa di TripVel ?"
        sub="Satu aplikasi untuk semua kebutuhan travel
"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <div className="rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm border-gray-500/20  bg-white font-base py-5 px-8 flex ">
          <div className="flex space-x-3 justify-center items-center">
            <Icon icon="noto:handbag" height={100} />
            <Separator orientation="vertical" className="h-100" />
            <div className="flex flex-col justify-center gap-2">
              <h4 className="text-lg font-semibold tracking-tight">
                Semua keperluanmu di satu tempat
              </h4>
              <p className="text-sm">
                Dari tiket pesawat, penginapan, sampai aktivitas,{" "}
                <span className="text-main font-bold">TripVel</span> punya
                produk lengkap dan Panduan Wisata yang pas.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm border-gray-500/20  bg-white font-base py-5 px-8 flex ">
          <div className="flex space-x-3 justify-center items-center">
            <Icon icon="emojione:money-with-wings" height={100} />
            <Separator orientation="vertical" className="h-100" />
            <div className="flex flex-col justify-center gap-2">
              <h4 className="text-lg font-semibold tracking-tight">
                Pembayaran aman dan nyaman
              </h4>
              <p className="text-sm">
                Nikmati transaksi dengan keamanan berlapis, serta beragam opsi
                pembayaran global & nasional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySection;
