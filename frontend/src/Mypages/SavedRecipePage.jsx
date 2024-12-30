import { useSelector } from 'react-redux'
import SavedRecipeCards from '../Mycomponents/SavedRecipeCards';
import Navbar from '../Mycomponents/Navbar';

const SavedRecipePage = () => {
    const {user} = useSelector(store =>store.user);
    return (
      <div>
        <div className='sticky top-0'><Navbar/></div>
        <p className="text-3xl font-semibold text-center py-7 uppercase tracking-wide">
          Saved recipes from a Your kitchen.
        </p>
          <div className=' grid sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 m-4   '>
              {user?.favRecipe.length > 0 &&
              user.favRecipe.map((recipe,index)=>(
                  <div key={index} className='m-2'>
                      <div  className="p-4 shadow-xl border rounded-lg  hover:shadow-lg transition-shadow max-w-[350px] mx-auto   ">
                          <SavedRecipeCards recipe={recipe}/>
                      </div>
                  </div>
              ))
              }
          </div>
      </div>
    )
}

export default SavedRecipePage