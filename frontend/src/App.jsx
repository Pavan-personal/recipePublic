import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Recipes from "./components/Recipes";
import { useRecoilState, useRecoilValue } from "recoil";
import { GridLoader } from "react-spinners";
import { loadAtom } from "./recoil/loadAtom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddRecipe from "./components/AddRecipe";
import { triggerAtom } from "./recoil/triggerAtom";
import DetailRecipe from "./components/DetailRecipe";
import { searchAtom } from "./recoil/searchAtom";

function App() {
  const [load, setLoad] = useRecoilState(loadAtom);
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useRecoilState(searchAtom);
  const trigger = useRecoilValue(triggerAtom);

  useEffect(() => {
    const getRecipes = async () => {
      setLoad(true);
      const recipes = await axios.get("https://recipe-app-opal-five.vercel.app/user/recipes");
      if (recipes.data.success) {
        setRecipes(recipes.data.recipes);
        setAllRecipes(recipes.data.recipes);
        setFilteredRecipes(recipes.data.recipes); // Initialize filteredRecipes
        setTimeout(() => {
          setLoad(false);
        }, 1500);
      } else {
        toast.error(recipes.data.message);
        setLoad(false);
      }
    };
    getRecipes();
  }, [trigger]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredRecipes(allRecipes);
    } else {
      const filtered = allRecipes.filter((recipe) => {
        return (
          recipe.name.toLowerCase().includes(search.toLowerCase()) ||
          recipe.description.toLowerCase().includes(search.toLowerCase()) ||
          recipe.createdBy.toLowerCase().includes(search.toLowerCase()) ||
          recipe.country.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredRecipes(filtered);
    }
  }, [search, allRecipes]);

  return (
    <>
      <Navbar />
      {!load ? (
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/recipes" element={<Recipes list={filteredRecipes} />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/detail" element={<DetailRecipe />} />
        </Routes>
      ) : (
        <div className="h-[85vh] flex items-center justify-center">
          <GridLoader />
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
