import { useEffect, useState } from "react";
import Navbar from "../Mycomponents/Navbar";
import RecipeCards from "../Mycomponents/RecipeCards";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import {useGetUser} from "../hook/useGetUser.js";

const MainLayout = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const {user} = useSelector(store => store.user);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    const api = "fd937df840dd4ecc970be9f369a525d6";
    console.log(searchInput);
    const apiURL = searchInput
      ? `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&apiKey=${api}`
      : `https://api.spoonacular.com/recipes/random?number=4&apiKey=${api}`;

    try {
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      console.log(data);
      // Update recipes state based on the search result
      if (searchInput) {
        setRecipes(data.results || []); // For search
      } else {
        setRecipes((prevRecipes) => [...prevRecipes, ...(data.recipes || [])]); // For random recipes
      }
    } catch (error) {
      console.error(error.message);
    }
  };

    if(user?._id){
      useGetUser();
    }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div >
      <div className="sticky top-0 z-10 shadow-md">
        <Navbar />
      </div>
      <div className=" bg-gray-100 min-h-screen w-full">
        <p className="text-3xl font-semibold text-center py-7 uppercase tracking-wide">
          Reliable recipes from a chef’s kitchen.
        </p>

        <div className="flex w-2/3 mx-auto relative my-7">
          <input
            className=" mx-auto rounded-l-[1rem] rounded-r-none outline-none w-[89%] px-3"
            placeholder="Search by title"
            required
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="!bg-red-600 p-2 text-white  rounde rounded-r-[1rem] rounded-l-none  w-[11%] "  onClick={fetchRecipes}>
            <i className="fa-solid fa-magnifying-glass text-lg" ></i>
          </button>
        </div>

        <div>
          {recipes.length === 0 && (
            <div className="text-2xl text-gray-600 my-3 h-[50vh] flex justify-center items-center ">
              No recipe Found
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 m-3   ">
          {recipes.length > 0 &&
            recipes.map((recipe, index) => (
              <div key={index} className="m-2">
                <div className="p-4 shadow-xl border rounded-lg  hover:shadow-lg transition-shadow max-w-[350px] mx-auto   ">
                  {/* <Link to={recipe?.spoonacularSourceUrl}> */}
                    <RecipeCards recipe={recipe} />
                  {/* </Link> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
