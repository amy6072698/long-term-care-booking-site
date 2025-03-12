import { useState } from "react";

//點擊愛心改變-元件
const HeartCard = () => {
  const [heart, setHeart] = useState(false);

  return (
    <>
      <a
        className="heart"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setHeart(!heart);
        }}
      >
        <img
          src={
            heart
              ? `https://raw.githubusercontent.com/Jack-Xiao-2024/ReactC5/a442977a25033104ad6b0fdb00c77acbcfc2c59a/public/images/Interact%20Icon/Heard-02.svg`
              : `https://raw.githubusercontent.com/Jack-Xiao-2024/ReactC5/a442977a25033104ad6b0fdb00c77acbcfc2c59a/public/images/Interact%20Icon/Heard-01.svg`
          }
          alt="heart"
          onClick={() => setHeart(!heart)}
          style={{ cursor: "pointer" }}
        />
      </a>
    </>
  );
};

export default HeartCard;
