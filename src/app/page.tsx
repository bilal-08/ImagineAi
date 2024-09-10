"use client";
import Menu from "@/components/Menu";
import ImageGen from "@/components/ImageGen";
export default function Page() {
  return (
    <>
      <Menu />
      <div className="bg-[#FFFFFF] dark:bg-[#09090B] h-screen flex flex-col items-center">
        <ImageGen />
        <p className="font-inter font-semibold mt-10 text-black dark:text-white">
          Created with ❤️
        </p>
      </div>
    </>
  );
}
