import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaHeart, FaEye } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { loadAtom } from "../recoil/loadAtom";
import { triggerAtom } from "../recoil/triggerAtom";
import { useNavigate } from "react-router-dom";

function RecipeCard(props) {
  const [load, setLoad] = useRecoilState(loadAtom);
  const [trigger, setTrigger] = useRecoilState(triggerAtom);
  const navigate = useNavigate();
  return (
    <div className="w-full sm:w-80 md:w-96 rounded-lg overflow-hidden shadow-lg bg-[rgba(0,0,0,0.5)] transform transition duration-500 hover:shadow-xl scale-95 hover:scale-100 cursor-pointer mx-auto">
      <img
        className="w-full h-[30vh] p-4 object-cover"
        src={props.recipe.photoURL}
        alt={props.recipe.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-slate-300">
          {props.recipe.name}
        </div>
        <p className="text-slate-200 text-sm mb-4">
          {props.recipe.description.slice(0, 90)}...
        </p>
        <div className="flex justify-between text-sm text-slate-200 mb-2">
          <span>Purchased By: {props.recipe.purchases}</span>
          <span>Country: {props.recipe.country.capit}</span>
        </div>
        <div className="flex justify-between">
          <div className="text-sm flex items-center gap-0.5 text-slate-200 mb-2">
            <span className="font-semibold text-xl">©</span>{" "}
            {props.recipe.createdBy}
          </div>
          <div className="flex gap-2">
            <div className="flex items-center text-sm text-slate-200 mb-4">
              <FaEye className="text-slate-100 mr-1" />
              <span>{props.recipe.views}</span>
            </div>
            <div className="flex items-center text-sm text-slate-200 mb-4">
              <FaHeart
                onClick={async (e) => {
                  e.preventDefault();
                  setLoad(true);
                  const res = await axios.post(
                    `https://recipe-app-opal-five.vercel.app/user/like/${props.recipe._id}`,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                  if (res.data.success) {
                    setLoad(false);
                    setTrigger(!trigger);
                    toast.success(res.data.message);
                  } else {
                    setLoad(false);
                    toast.error(res.data.message);
                  }
                }}
                className="text-red-500 cursor-pointer mr-1"
              />
              <span>{props.recipe.likes}</span>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            localStorage.setItem("recipe", props.recipe._id);
            navigate("/detail");
          }}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
