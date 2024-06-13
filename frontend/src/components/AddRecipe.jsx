import axios from "axios";
import React, { useState } from "react";
import { loadAtom } from "../recoil/loadAtom";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { triggerAtom } from "../recoil/triggerAtom";

function AddRecipe() {
  const [load, settLoad] = useRecoilState(loadAtom);
  const [trigger, setTrigger] = useRecoilState(triggerAtom);
  const [formData, setFormData] = useState({
    name: "",
    videoURL: "",
    country: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    settLoad(true);
    const newFormData = new FormData();
    newFormData.append("name", formData.name);
    newFormData.append("videoURL", formData.videoURL);
    newFormData.append("country", formData.country);
    newFormData.append("description", formData.description);
    newFormData.append("file", formData.file);
    const res = await axios.post(
      "https://recipe-app-opal-five.vercel.app/user/add",
      newFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.success) {
      settLoad(false);
      setTrigger(!trigger);
      toast.success(res.data.message);
    } else {
      settLoad(false);
      toast.error(res.data.message);
    }
    console.log(formData);
  };

  return (
    <section className="bg-[rgba(0,0,0,0.5)] my-8 px-4 sm:px-10 w-full sm:w-3/4 lg:w-1/2 mx-auto rounded-lg">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new recipe
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Recipe Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[rgba(255,255,255,0.2)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type recipe name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="videoURL"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Video URL of recipe
              </label>
              <input
                type="text"
                name="videoURL"
                id="videoURL"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[rgba(255,255,255,0.2)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter YouTube URL"
                required
                value={formData.videoURL}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <select
                name="country"
                id="country"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-[rgba(255,255,255,0.2)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select country</option>
                <option value="India">India</option>
                <option value="US">US</option>
                <option value="Italic">Italic</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="file"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Choose Image
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-[rgba(255,255,255,0.2)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-[rgba(255,255,255,0.2)] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
                required
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-slate-200 bg-[rgba(255,255,255,0.2)] rounded-lg hover:bg-slate-700 duration-500"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddRecipe;
