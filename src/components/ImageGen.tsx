"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTheme } from "./ThemeProvider";

import { useState, useEffect } from "react";
// import { grid } from "ldrs";

// grid.register();

export default function ImageGen() {
  const [InputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    async function loadGrid() {
      const { grid } = await import("ldrs");
      grid.register(); // Register grid on the client side
    }

    loadGrid(); // Ensure it's only called client-side
  }, []);
  const handleSelectChange = (value: string) => {
    setInputText(value);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  const handleRunClick = async () => {
    if (!InputText) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/get-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: InputText }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-3/5 max-sm:w-4/5 m-1 flex justify-between items-center font-semibold  mt-10">
        <p className="text-black dark:text-white">Prompt</p>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="peer w-[180px] max-sm:w-[130px] dark:data-[placeholder]:text-white data-[placeholder]:text-black">
            <SelectValue placeholder="Example" className="" />
          </SelectTrigger>
          <SelectContent className="w-[180px] overflow-hidden">
            <SelectItem
              className="truncate"
              value="portrait | wide angle shot of eyes off to one side of frame, lucid dream-like woman, looking off in distance ::8 style | daydreampunk with glowing skin and eyes, styled in headdress, beautiful, she is dripping in neon lights, very colorful blue, green, purple, bioluminescent, glowing ::8 background | forest, vivid neon wonderland, particles, blue, green, purple ::7 parameters | rule of thirds, golden ratio, assymetric composition, hyper- maximalist, octane render, photorealism, cinematic realism, unreal engine, 8k ::7 --ar 16:9 --s 1000"
            >
              portrait | wide angle shot of eyes off to one side of frame, lucid
              dream-like woman, looking off in distance ::8 style | daydreampunk
              with glowing skin and eyes, styled in headdress, beautiful, she is
              dripping in neon lights, very colorful blue, green, purple,
              bioluminescent, glowing ::8 background | forest, vivid neon
              wonderland, particles, blue, green, purple ::7 parameters | rule
              of thirds, golden ratio, assymetric composition, hyper-
              maximalist, octane render, photorealism, cinematic realism, unreal
              engine, 8k ::7 --ar 16:9 --s 1000
            </SelectItem>
            <SelectItem
              className="truncate"
              value="Close-up of LEGO chef minifigure cooking for homeless. Focus on LEGO hands using utensils, showing culinary skill. Warm kitchen lighting, late morning atmosphere. Canon EOS R5, 50mm f/1.4 lens. Capture intricate cooking techniques. Background hints at charitable setting. Inspired by Paul Bocuse and Massimo Bottura's styles. Freeze-frame moment of food preparation. Convey compassion and altruism through scene details."
            >
              Close-up of LEGO chef minifigure cooking for homeless. Focus on
              LEGO hands using utensils, showing culinary skill. Warm kitchen
              lighting, late morning atmosphere. Canon EOS R5, 50mm f/1.4 lens.
              Capture intricate cooking techniques. Background hints at
              charitable setting. Inspired by Paul Bocuse and Massimo Bottura's
              styles. Freeze-frame moment of food preparation. Convey compassion
              and altruism through scene details.
            </SelectItem>
            <SelectItem
              className="truncate"
              value="Anime style portrait of a female samurai at a beautiful lake with cherry trees, mountain fuji background, spring, sunset"
            >
              Anime style portrait of a female samurai at a beautiful lake with
              cherry trees, mountain fuji background, spring, sunset
            </SelectItem>
            <SelectItem
              className="truncate"
              value="Hot air balloon, steampunk design, floating above, Victorian city, gears, steam, brass, copper, clockworks, ruins, lost civilization, ancient architecture, overgrown, jungle, greenery, atmosphere, dramatic, evening, warm, golden light, sunset, clouds, blue sky, detailed, vibrant, dynamic, intricate, immersive, captivating, painting, realistic, oil painting, epic, grand, adventure, exploration, mystery, alluring, enchanting, captivating, evocative, inspiring, breathtaking:0.5), see-through, transparent"
            >
              Hot air balloon, steampunk design, floating above, Victorian city,
              gears, steam, brass, copper, clockworks, ruins, lost civilization,
              ancient architecture, overgrown, jungle, greenery, atmosphere,
              dramatic, evening, warm, golden light, sunset, clouds, blue sky,
              detailed, vibrant, dynamic, intricate, immersive, captivating,
              painting, realistic, oil painting, epic, grand, adventure,
              exploration, mystery, alluring, enchanting, captivating,
              evocative, inspiring, breathtaking:0.5), see-through, transparent
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-3/5 max-sm:w-4/5 flex flex-col justify-center items-start ">
        <div className="flex w-full mb-2">
          <Input
            value={InputText}
            onChange={handleInputChange}
            placeholder="Write your prompt here..."
            className="placeholder-black dark:placeholder-white text-black dark:text-white  outline-none focus:ring-0 focus:border-none"
          />
          <Button
            variant="outline"
            className={`ml-1 ${loading ? "bg-[#F4F4F5]" : ""} text-black dark:text-white`}
            onClick={handleRunClick}
            disabled={loading}
          >
            {loading ? "Loading..." : "Run"}
          </Button>
        </div>
        <div className="w-full min-h-96 flex justify-center items-center">
          {loading && (
            <div className="flex justify-center items-center text-center font-inter text-xl font-bold">
              <l-grid
                size="60"
                speed="1.5"
                color={theme == "light" ? "black" : "white"}
              ></l-grid>
            </div>
          )}
          {!loading && imageUrl && (
            <img
              className="w-full min-h-96 object-cover"
              src={imageUrl}
              alt="Fetched content"
            />
          )}
          {!loading && !imageUrl && (
            <div className="w-full min-h-96 flex justify-center items-center text-center bg-[#E2E2E2] dark:bg-[#ffffff] rounded-sm font-inter text-xl font-bold">
              <p>Run Prompt to get started!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
