import React, { FC } from "react";
import Image from "next/image";

interface Props {
  imageUrl: string;
}

const Avatar: FC<Props> = ({ imageUrl }) => {
  return (
    <div className="w-[75px] flex items-center">
      <div className="w-fit h-fit rounded-full overflow-hidden">
        <Image width={45} height={45} alt="avatar" src={imageUrl} />
      </div>
    </div>
  );
};

export default Avatar;
