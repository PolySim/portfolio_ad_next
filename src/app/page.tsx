import Image from "next/image";
import HomeImg from "@/image/home.jpg";

export default async function Home() {
  return (
    <>
      <div className="w-screen max-w-6xl mx-auto mt-5 md:mt-10">
        <Image src={HomeImg} alt="Home page image" />
      </div>
    </>
  );
}
