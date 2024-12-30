import Navbar from "./Navbar";

const SavedRecipeCards = ({ recipe }) => {
    // const dispatch = useDispatch();
    // const {userRefresh} = useSelector((store) => store.user);
  
    // const saveLiked = async (image, summary, title, id, spoonacularSourceUrl) => {
    //   try {
    //     const response = await axios.put(
    //       "/user/likedRecipe",
    //      { image,
    //       summary,
    //       title,
    //       id,
    //       spoonacularSourceUrl}
    //     );
    //     console.log(response.data,image,
    //       summary,
    //       title,
    //       id,
    //       spoonacularSourceUrl);
    //     toast.success(response.data.message);
    //     dispatch(getUSerRRefresh());
    //     console.log(userRefresh);
    //   } catch (error) {
    //     console.log(error);
    //     toast.error(error.response.data.message);
    //   }
    // };
    return (
      <div className="max-w-[360px] max-h-[550px] ">
        {/* title ,like*/}
        <div className="flex justify-between items-center ">
          <div className="text-2xl font-semibold my-3 line-clamp-1">
            {recipe?.name}
          </div>
          
        </div>
        <hr className="border-gray-400 my-2" />
  
        <img
          src={recipe?.image}
          alt="Card image"
          className="w-full h-48 object-cover rounded-t-lg my-4 rounded"
        />
        <hr className="border-gray-400 my-2" />
  
        {/* description */}
        <div>
          <div className="line-clamp-3 text-gray-600">
            {recipe?.description}
          </div>
        </div>
      </div>
    );
};

export default SavedRecipeCards;
