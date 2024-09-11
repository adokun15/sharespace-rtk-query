import defaultImage from "../image/icons8-user-24.png";
export default function Image({ imgSrc, h, w }) {
  return (
    <img
      height={h ? h : "150"}
      width={w ? w : "150"}
      className=" rounded-full scale-105 hover:scale-100 duration-75 ease-in-out aspect-square object-cover"
      src={imgSrc || defaultImage}
      alt="ProfilePic"
    />
  );
}
