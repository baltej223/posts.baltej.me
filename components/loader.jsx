import React from "react";

const Loader = ({
  size = 72,
  speed = 1.5,
  label = "Loading...",
  showLabel = true,
}) => {
  const borderWidth = size * 0.08;
  const ringStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${borderWidth}px`,
    animationDuration: `${2 / speed}s`,
  };

  return (
    <div className="fixed inset-0 z-50 font-sans bg-black bg-opacity-80">
      <style>
        {`
          @keyframes pulse-ring {
            0%, 100% {
              transform: scale(0.9);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.1);
              opacity: 1;
            }
          }
        `}
      </style>
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        style={{ top: "38.2vh" }} // ≈ 1 / golden ratio of screen height
      >
        <div
          className="border-white border-solid rounded-full animate-[pulse-ring_ease-in-out_infinite]"
          style={ringStyle}
        ></div>
        {showLabel && (
          <span className="text-xs uppercase tracking-wider text-gray-300">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default Loader;
