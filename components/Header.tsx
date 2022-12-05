"use client";

import Logo from "@/components/Logo";
import { useTypeedContext } from "@/lib/context";
import { useEffect } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export default function Header() {
  const { dispatch, darkMode } = useTypeedContext();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between px-4 py-2">
      <Logo className="fill-slate-700 dark:fill-slate-100 mt-2 ml-4 md:mt-4 md:w-32 md:h-auto" />
      <button
        className="text-slate-700 dark:text-slate-100 p-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 bg-gray-200 dark:bg-gray-900"
        onClick={() => {
          dispatch({
            type: "SET_VALUE",
            payload: {
              darkMode: !darkMode,
            },
          });
        }}
      >
        {darkMode ? <BsMoonFill /> : <BsSunFill />}
      </button>
    </header>
  );
}
