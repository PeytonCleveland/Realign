"use client";

import Link from "next/link";
import { FC, Fragment } from "react";

interface Breadcrumb {
  text: string;
  href: string;
  active?: boolean;
}

interface Props {
  items: Breadcrumb[];
  className?: string;
}

const Breadcrumbs: FC<Props> = ({ items, className }) => {
  return (
    <div className={"flex gap-2.5 items-center" + " " + className}>
      {items.map((item, index) => {
        return (
          <Fragment key={index}>
            <Link
              href={item.href}
              className={
                item.active
                  ? "text-black font-semibold text-sm"
                  : "text-gray-500 text-sm"
              }
            >
              {item.text}
            </Link>
            {index === items.length - 1 ? null : (
              <p className="text-gray-500">/</p>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
