import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
export default function Menu() {
  const { toggleTheme } = useTheme();
  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#09090B] flex h-12 items-center justify-between p-3 border-[#27272A] border-b-[1px]">
        <h1 className="text-xl text-black dark:text-white font-spacemono flex">
          Imagin<p className="text-[#BE153D]">Ai</p> ✨
        </h1>
        <div className="flex justify-center items-center">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden stroke-black" />
            <Moon className="hidden h-5 w-5 dark:block stroke-white" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link href="https://github.com/bilal-08/imagineai" target="_blank">
            <div className="bg-white dark:bg-black stroke-black dark:stroke-white  hover:bg-[#E2E2E2] hover:cursor-pointer w-10 p-2 rounded-sm flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                //   stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
