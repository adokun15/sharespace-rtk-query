export default function Image({ imgSrc, h, w }) {
  return (
    <img
      height={h ? h : "150"}
      width={w ? w : "150"}
      className=" rounded-full aspect-square object-cover"
      src={imgSrc}
      alt="ProfilePic"
    />
  );
}
