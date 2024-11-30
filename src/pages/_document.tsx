import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
        rel="preload"
        href="/image/heroimage.webp"
        as="image"
        type="image/webp"
      />
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
      <meta
        name="description"
        content="Jelajahi dan booking tempat wisata favoritmu dengan mudah dan aman. Nikmati pembayaran yang fleksibel, harga terbaik, dan konfirmasi instan untuk berbagai destinasi wisata di Indonesia."
      />

      <meta
        name="keywords"
        content="booking wisata online, tiket tempat wisata, reservasi tempat wisata, booking destinasi wisata, pembayaran tiket wisata, wisata Indonesia, platform booking wisata, pemesanan tiket wisata, paket wisata, destinasi liburan"
      />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
