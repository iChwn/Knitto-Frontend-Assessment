import React, { FC } from "react";
import Image from "next/image";

type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
}

const ImageComponent:FC<ImageProps> = ({src, alt = ""}) => {
  return (
    <div className="w-full h-full flex items-center">
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        className="w-full h-full object-cover"
      />
    </div>
  )
}


export default ImageComponent;