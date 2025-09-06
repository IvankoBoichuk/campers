export interface Gallery {
  thumb: string
  original: string
}

export interface GalleryWithAlt extends Gallery {
  alt: string;
}