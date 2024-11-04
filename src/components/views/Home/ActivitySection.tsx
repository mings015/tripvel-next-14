import TitleMain from "@/components/content/titleMain";
import Image from "next/image";
import { Icon } from "@iconify/react";

const ActivitySection = () => {
  return (
    <div className=" mx-auto container px-4">
      <TitleMain
        text="Activity"
        sub="Temukan yang kamu suka di Asia hingga dunia"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white text-center rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm border-gray-500/20">
          <div className="">
            <Image
              src="/image/img-login.png"
              alt="halo"
              width={200}
              height={160}
              style={{ height: "100%", width: "100%" }}
              //OR className='w-100 h-100'
              className="mx-auto mb-4 rounded-t-xl object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Jakarta</h3>
          <p className="text-gray-600 mb-2">Alamat</p>
          <div className="flex justify-center items-center mb-2">
            <span className="text-yellow-500 mr-1">
              {"\u2605".repeat(Math.floor(5))}
            </span>
            <span className="text-gray-500">(155 Review)</span>
          </div>
          <p className="text-green-600 font-semibold text-lg mb-4">IDR 15k</p>
        </div>
      </div>
      <h2 className="text-sm font-medium pt-4 text-slate-600 flex gap-2 justify-center items-center">
        Lihat selengkapnya{" "}
        <span>
          <Icon icon="ep:arrow-down" />
        </span>
      </h2>
    </div>
  );
};

export default ActivitySection;
