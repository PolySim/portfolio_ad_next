const shortText: (text: string) => string = (text) => {
  const words = text.split(" ");
  words.pop();
  const shortText = words.splice(0, 17).join(" ");

  return shortText + "...";
};

const SmallText = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full transition relative cursor-pointer hover:scale-95">
      <p className="w-10/12 text-md text-gray-700">{shortText(text)}</p>
      <p className="mt-2 pt-6 font-bold text-sm text-black">READ MORE</p>
    </div>
  );
};
/**
 * display: flex;
 *   flex-direction: column;
 *   justify-content: center;
 *   align-items: center;
 *   width: 100%;
 *   transition: transform 0.2s linear;
 *   position: relative;
 *   cursor: pointer;
 */

export default SmallText;
