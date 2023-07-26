"use client";

import { FC, useState } from "react";

interface Props {
  tabs: string[];
  borderColor?: "gray" | "blue";
  onChange: (index: number) => void;
}

const Tabs: FC<Props> = ({ tabs, borderColor = "gray", onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (index: number) => {
    setActiveIndex(index);
    onChange(index);
  };

  return (
    <div
      className={
        borderColor === "gray"
          ? "w-full border-b-2 border-gray-200"
          : "w-full border-b-2 border-blue-600"
      }
    >
      {tabs.map((tab, index) => {
        return (
          <button
            onClick={() => handleChange(index)}
            className={
              index === activeIndex
                ? "font-medium text-blue-600 border-b-4 border-blue-600 pb-2 px-6"
                : "font-medium text-gray-400 border-b-4 border-transparent pb-2 px-6"
            }
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
