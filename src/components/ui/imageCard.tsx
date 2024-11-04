type Props = {
  imageUrl: string;
  children: React.ReactNode;
};

export default function ImageCard({ imageUrl, children }: Props) {
  return (
    <figure className="rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm border-gray-500/20  bg-white font-base">
      <img className="w-full" src={imageUrl} alt="image" />
      <figcaption className="border-t-2 text-text border-black dark:border-darkBorder p-4">
        {children}
      </figcaption>
    </figure>
  );
}
