"use client";

import { useRouter } from "next/navigation";

const QuitFullPage = () => {
  const router = useRouter();
  return (
    <div
      className="fixed top-6 right-6 z-50 cursor-pointer"
      onClick={() => router.back()}
    >
      <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
        <path
          d="M20 20L4 4.00003M20 4L4.00002 20"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default QuitFullPage;
