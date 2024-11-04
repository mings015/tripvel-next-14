import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Icon } from "@iconify/react";

const FormContact = () => {
  return (
    <div className="mt-20 mx-auto container px-6 py-10">
      <div className="md:flex grid gap-10">
        <div className="md:w-1/2 flex flex-col gap-3 md:text-end text-start">
          <h2 className="text-3xl font-bold leading-none tracking-tight mb-4">
            TINGGALKAN PESAN 😍
          </h2>
          <p className="mb-4">
            Menghadapi masalah dan tidak dapat menemukan solusi? Jangan
            khawatir, kami siap membantu. Alamat email Anda tidak akan
            dipublikasikan.
          </p>
          <div className="text-main font-semibold text-lg">Waktu Kerja</div>
          <div className="flex items-center mt-1 gap-4 md:justify-end justify-start">
            <Icon icon="lets-icons:clock-light" fontSize={32} />
            <span>Senin-Minggu: 24 jam</span>
          </div>
        </div>
        <Card className="md:w-1/2 ">
          <CardHeader>
            <CardTitle className="text-2xl">Hubungi Kami Kapan Saja</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="subject">Surel: *</Label>
              <Input
                type="email"
                id="subject"
                placeholder="E-mail"
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="message">Pesan:</Label>
              <Textarea id="message" placeholder="Pesan" className="mt-1" />
            </div>

            <div className="mb-4">
              <Label htmlFor="phone">No Telepon:</Label>
              <Input type="tel" id="phone" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="contact">Kontak:</Label>
              <Input type="text" id="contact" className="mt-1" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Kirim Sekarang</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FormContact;
