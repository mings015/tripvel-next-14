import Image from "next/image";

const ImageLoginRegis = () => {
  return (
    <Image
      src="/image/img-login.png"
      width={500}
      height={500}
      alt="Picture of the author"
      className="w-full object-cover h-full -translate-y-10 md:-translate-y-0"
      priority
    />
  );
};

export default ImageLoginRegis;
