import type { GalleryWithAlt } from "@/types/Gallery";
import LightGallery, { type LightGalleryProps } from "lightgallery/react";
// styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

type Props = {
  images: GalleryWithAlt[];
  className?: string;
} & Omit<LightGalleryProps, "children">;

export default function Gallery({
  images = [],
  className = "",
  ...rest
}: Props) {
  return (
    <LightGallery
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
      elementClassNames={className}
      {...rest}
    >
      {images.map((el) => (
        <a key={el.original} href={el.original}>
          <img
            src={el.thumb}
            alt={el.alt}
            width={292}
            height={312}
            className="aspect-[292/312] object-center object-cover rounded-[10px]"
            loading="lazy"
          />
        </a>
      ))}
    </LightGallery>
  );
}
