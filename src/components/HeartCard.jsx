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
              ? "src/assets/images/Interact Icon/Heard-02.svg"
              : "src/assets/images/Interact Icon/Heard-01.svg"
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