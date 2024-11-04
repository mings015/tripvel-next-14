import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { FAQS_DATA } from "@/helper/dummy";
import React from "react";

const FaqsAccordion = () => {
  return (
    <div className="mt-20 mx-auto container px-6 py-10">
      <div className="md:flex grid gap-14">
        <div className="md:w-1/2 flex flex-col gap-3 mt-4">
          <h2 className="text-3xl font-bold tracking-tight mb-4 md:text-end text-start">
            Jika Anda Tidak Dapat Menemukan
            <span className="text-main"> Jawaban</span> Untuk Pertanyaan Terkait
            🤗
          </h2>
          <Separator />
          <p className="mb-4 md:text-end text-start">
            Jelajahi Tanya Jawab Umum kami untuk menemukan jawaban, informasi,
            dan solusi tentang produk kami. Jelajahi dan temukan semua yang
            perlu Anda ketahui!
          </p>
        </div>
        <div className="md:w-1/2">
          <Accordion type="single" collapsible className="w-full">
            {FAQS_DATA.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-xl">
                  {faq.title}
                </AccordionTrigger>
                <AccordionContent className="text-lg">
                  {faq.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FaqsAccordion;
