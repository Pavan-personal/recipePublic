import React from "react";

const GoldCoin = (props) => {
  return (
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 bg-yellow-400 rounded-full shadow-lg border-2 border-yellow-600 flex items-center justify-center">
        <span className="text-lg font-bold text-black">C</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 rounded-full opacity-75 blur-sm"></div>
    </div>
  );
};

export default GoldCoin;
