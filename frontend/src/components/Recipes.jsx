import React from "react";
import RecipeCard from "./RecipeCard";

function Recipes(props) {
  return props.list.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full lg:w-fit mx-auto py-8 px-4">
      {props.list.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe._id} />
      ))}
    </div>
  ) : (
    <div className="text-center py-10 text-xl text-slate-100 font-bold">No results</div>
  );
}

export default Recipes;
