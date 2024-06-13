import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GridLoader } from "react-spinners";
import { FaHeart, FaEye, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DetailRecipe() {
  const id = localStorage.getItem("recipe");
  const navigate = useNavigate();
  const getIframeLink = (url) => {
    if (!url) {
      return "";
    }

    let videoId;
    const standardLink = url.split("v=")[1];
    const shortLink = url.split("youtu.be/")[1];

    if (standardLink) {
      videoId = standardLink.split("&")[0];
    } else if (shortLink) {
      videoId = shortLink.split("?")[0];
    } else {
      // Invalid YouTube URL format
      return "";
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const res = await axios.get(`https://recipe-app-opal-five.vercel.app/user/view/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          toast.success(res.data.message);
          setRecipe(res.data.recipe);
        } else {
          navigate("/recipes");
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    if (id) {
      getRecipe();
    }
  }, [id]);

  return recipe.description ? (
    <div className="max-w-4xl select-none text-slate-200 mx-auto p-4 my-4 scale-95 sm:scale-100 md:my-12 sm:p-8 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-white">
        {recipe.name}
      </h1>
      <div className="mb-6">
        <iframe
          width="100%"
          className="mx-auto rounded-lg shadow-lg"
          height="315"
          src={getIframeLink(recipe.videoURL)}
          title={recipe.name}
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 my-8">
        <img
          src={recipe.photoURL}
          alt={recipe.name}
          className="lg:w-1/2 w-full h-auto rounded-lg shadow-lg object-cover"
        />
        <div className="lg:w-1/2 flex flex-col justify-center">
          <p className="text-lg mb-4">
            <strong className="text-white">Description:</strong>{" "}
            {recipe.description}
          </p>
          <p className="text-lg mb-4">
            <strong className="text-white">Country:</strong> {recipe.country}
          </p>
          <p className="text-lg mb-4">
            <strong className="text-white">Created by:</strong>{" "}
            {recipe.createdBy}
          </p>
          <div className="flex flex-wrap gap-4 mt-4 cursor-pointer">
            <div className="flex items-center text-lg text-white">
              <FaHeart className="text-red-500 mr-2" />
              <strong>Likes:&nbsp;</strong> {recipe.likes}
            </div>
            <div className="flex items-center text-lg text-white">
              <FaEye className="text-blue-500 mr-2" />
              <strong>Views:&nbsp;</strong> {recipe.views}
            </div>
            <div className="flex items-center text-lg text-white">
              <FaShoppingCart className="text-green-500 mr-2" />
              <strong>Purchases:&nbsp;</strong> {recipe.purchases}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-[90vh] flex justify-center items-center">
      <GridLoader color="#ffffff" />
    </div>
  );
}

export default DetailRecipe;
