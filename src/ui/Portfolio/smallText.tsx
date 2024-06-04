import { ImageType } from "@/app/portfolio/[pageId]/page";
import Link from "next/link";

const shortText: (text: string) => string = (text) => {
  const words = text.split(" ");
  words.pop();
  const shortText = words.splice(0, 17).join(" ");

  return shortText + "...";
};

const SmallText = ({
  image,
  pageId,
  index,
  text,
}: {
  image: ImageType;
  pageId: string;
  index: number;
  text: string;
}) => {
  return (
    <Link
      href={`/portfolio/${pageId}?open=true&imageClick=${index}`}
      className="flex flex-col justify-center items-center w-full transition relative cursor-pointer hover:scale-95"
    >
      <p className="w-10/12 text-md text-gray-700">{shortText(text)}</p>
      <p className="mt-2 pt-6 font-bold text-sm text-black">READ MORE</p>
    </Link>
  );
};

export default SmallText;
