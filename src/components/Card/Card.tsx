import { FC, ReactNode } from "react";
import Link from "next/link";

interface props {
  title: string;
  href: string;
  image: ReactNode;
}

const Card: FC<props> = ({ title, href, image }) => {
  return (
    <Link
      className="group relative inline-block focus:outline-none w-full h-[175px] bg-white"
      href={href}
    >
      <span className="absolute inset-0 border-r-2 border-b-2 rounded-md border-transparent group-hover:border-blue-400 border-dashed"></span>
      <span className="flex border-2 justify-between rounded-md border-gray-200 h-full p-6 transition-transform group-hover:-translate-x-[6px] group-hover:-translate-y-[6px]">
        <p className="max-w-[150px]">{title}</p>
        {image}
      </span>
    </Link>
  );
};

export default Card;
