interface IImageProps {
  url: string;
  alt: string;
  className?: string;
}

function Image({ url, alt, className }: IImageProps) {
  return <img src={url} alt={alt} className={className} />;
}

export default Image;
