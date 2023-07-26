import React, { FC } from "react";

interface Props {
  children?: React.ReactNode;
}

const Page: FC<Props> = ({ children }) => {
  return <main className="flex flex-col flex-1 w-full">{children}</main>;
};

export default Page;
