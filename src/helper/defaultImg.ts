export const DEFAULT_IMAGE =
  "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1730775872832-bali.webp";

export const getImageUrl = (url: string): string => {
  return url && url.trim() !== "" ? url : DEFAULT_IMAGE;
};
