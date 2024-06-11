import { AboutType } from "@/model/aboutModel";
import Image from "next/image";
import AboutImg from "@/image/about.jpeg";

const getBiography = async () => {
  "use server";
  try {
    return await fetch(`${process.env.API_URL}/api/about`, {
      method: "GET",
    }).then((res) => res.json() as Promise<AboutType>);
  } catch (e) {
    console.log(e);
    return { fr: "", en: "" };
  }
};

export default async function AboutPage() {
  const biography = await getBiography();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16 w-full max-w-7xl mx-auto p-8 md:p-10">
      <div className="md:sticky top-6 w-full h-max">
        <Image
          src={AboutImg}
          width={100}
          height={100}
          alt="Angeline Desdevises"
        />
      </div>
      <div className="text-gray-600 font-helvetica">
        <h1 className="text-gray-900 text-4xl md:text-6xl font-bold">
          Biographie (fr)
        </h1>
        <p className="text-xs font-medium text-gray-600 mt-3 md:mt-5 leading-5">
          {biography?.fr}
        </p>
        <h4 className="mt-6 text-lg md:text-2xl font-semibold">
          Biography (en)
        </h4>
        <p className="text-xs font-medium text-gray-600 mt-3 leading-5">
          {biography?.en}
        </p>
      </div>
    </div>
  );
}
