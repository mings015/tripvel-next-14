type Props = {
  imageUrl: string;
  children: React.ReactNode;
};

export default function ImageCard({ imageUrl, children }: Props) {
  return (
    <figure className="rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm border-gray-500/20  bg-white font-base">
      <img className="w-full h-40 " src={imageUrl} alt="image" />
      <figcaption className="] text-text p-4">{children}</figcaption>
    </figure>
  );
}
