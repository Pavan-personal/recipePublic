import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loadAtom } from "../recoil/loadAtom";
import { triggerAtom } from "../recoil/triggerAtom";

function Banner() {
  const [load, setLoad] = useRecoilState(loadAtom);
  const [trigger, setTrigger] = useRecoilState(triggerAtom);
  return (
    <section className="relative h-[90vh]">
      <div className="absolute inset-0 bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-md animate-fadeInDown">
          Welcome to Recipe Sharing
        </h1>
        <p className="text-xl mb-8 drop-shadow-md animate-fadeInUp">
          Discover and share amazing recipes from around the world.
        </p>
        <div className="flex space-x-4 mb-12">
          <Link
            onClick={() => {
              setTrigger(!trigger);
            }}
            to={"/recipes"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            See Recipes
          </Link>
          <Link
            to={"/add"}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Add Recipes
          </Link>
        </div>
        <div className="bg-white bg-opacity-75 rounded-lg p-6 shadow-lg backdrop-blur-md animate-fadeInUp">
          <h2 className="text-3xl font-bold text-black mb-4 drop-shadow-md">
            Success Stories
          </h2>
          <div className="flex justify-center space-x-16">
            <div>
              <p className="text-4xl font-bold text-black">
                <CountUp duration={2.5} end={1000} />
              </p>
              <p className="text-black">Recipes Count</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black">
                <CountUp duration={2.5} end={500} />
              </p>
              <p className="text-black">Users Count</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
