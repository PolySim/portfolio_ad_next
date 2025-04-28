import Image from "next/image";
import AboutImg from "@/image/about.jpeg";

import { getBiography } from "@/actions/about";

export const metadata = {
  title: "A propos",
};

export default async function AboutPage() {
  const biography = await getBiography();
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16 w-full max-w-7xl mx-auto p-8 md:p-10">
      <div className="md:sticky top-6 w-full h-max">
        <Image
          src={AboutImg}
          width={568}
          height={852}
          alt="Angeline Desdevises"
          className="w-full"
        />
      </div>
      <div className="text-gray-600 font-helvetica">
        <h1 className="text-gray-900 text-4xl md:text-6xl font-bold">
          Biographie (fr)
        </h1>
        <p className="text-xs font-medium text-gray-600 mt-3 md:mt-5 leading-5">
          {biography?.fr
            .split("\n")
            .map((line, index) => <p key={index}>{line}</p>)}
        </p>
        <h4 className="mt-6 text-lg md:text-2xl font-semibold">
          Biography (en)
        </h4>
        <p className="text-xs font-medium text-gray-600 mt-3 leading-5">
          {biography?.en
            .split("\n")
            .map((line, index) => <p key={index}>{line}</p>)}
        </p>
      </div>
    </div>
  );
}
