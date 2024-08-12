import ImageContainer from "@/ui/Portfolio/ImageContainer";

const shortText: (text: string) => string = (text) => {
  const words = text.split(" ");
  words.pop();
  const shortText = words.splice(0, 17).join(" ");

  return shortText + "...";
};

const SmallText = ({ index, text }: { index: number; text: string }) => {
  return (
    <ImageContainer index={index}>
      <div className="flex flex-col justify-center items-center w-full aspect-video">
        <p className="w-10/12 text-md text-gray-700">{shortText(text)}</p>
        <p className="mt-2 pt-6 font-bold text-sm text-black">READ MORE</p>
      </div>
    </ImageContainer>
  );
};

export default SmallText;
