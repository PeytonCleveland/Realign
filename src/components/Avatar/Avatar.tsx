import React, { FC } from "react";
import Image from "next/image";

interface Props {
  imageUrl: string;
  size?: string;
}

const Avatar: FC<Props> = ({ imageUrl, size = "sm" }) => {
  return (
    <div className="w-[75px] flex items-center">
      <div className="w-fit h-fit rounded-full overflow-hidden">
        <Image
          width={size === "lg" ? 70 : 45}
          height={size === "lg" ? 70 : 45}
          alt="avatar"
          src={imageUrl}
        />
      </div>
    </div>
  );
};

export default Avatar;
