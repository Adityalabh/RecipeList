import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getUserRefresh } from "../redux/userSlice";

const RecipeCards = ({ recipe }) => {
  //   console.log("recipe title", recipe);
  const dispatch = useDispatch();
  const { userRefresh } = useSelector((store) => store.user);

  const saveLiked = async (image, summary, title, id, spoonacularSourceUrl) => {
    try {
      const response = await axios.put("/user/likedRecipe", {
        image,
        summary,
        title,
        id,
        spoonacularSourceUrl,
      });
      console.log(
        response.data,
        image,
        summary,
        title,
        id,
        spoonacularSourceUrl
      );
      toast.success(response.data.message);
      dispatch(getUserRefresh());
      console.log(userRefresh);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="max-w-[360px] max-h-[550px] ">
      {/* title ,like*/}
      <div className="flex justify-between items-center ">
        <div className="text-2xl font-semibold my-3 line-clamp-1">
          {recipe?.title}
        </div>
       {recipe?.spoonacularSourceUrl && <div>
        <i
          className="fa-solid fa-heart text-xl text-pink-600 cursor-pointer"
          onClick={() =>
            saveLiked(
              recipe?.image,
              recipe?.summary,
              recipe?.title,
              recipe?.id,
              recipe?.spoonacularSourceUrl
            )
          }
        ></i></div>}
      </div>
      <hr className="border-gray-400 my-2" />

      <Link to={recipe?.spoonacularSourceUrl}>
      <img
        src={
          recipe?.image ||
          "https://png.pngtree.com/png-vector/20191129/ourmid/pngtree-hand-drawn-fast-food-doodle-vector-set-of-fast-food-vector-png-image_2046737.jpg"
        }
        alt="Card image"
        className="w-full h-48 object-cover rounded-t-lg my-4 rounded"
      />
      </Link>

      {/* description */}
      {recipe?.summary && (
        <div>
          <hr className="border-gray-400 my-2" />
          <div className="line-clamp-3 text-gray-600">{recipe?.summary}</div>
        </div>
      )}
    </div>
  );
};

export default RecipeCards;
