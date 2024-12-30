import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "./Logout";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <nav className="bg-red-500 p-3">
      <div className="flex items-center justify-between">
        {/* Left side - App name */}
        <div className="text-white text-xl font-bold">
          <Link to={"/"}>MeCooks</Link>
        </div>

        {/* Right side - Account, User logo and name */}
        <div className="flex items-center">
          <div className="flex items-center text-white">
            {/* User Logo */}
            {user?.registeredUser?._id ? (
              <div className="flex items-center">
                <div className="pr-7 font-semibold hover:underline">
                  <Link to={"/savedRecipe"}>Saved Recipes</Link>
                </div>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleClickOpen}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="ml-2">{user?.userName}</span>
                </div>
              </div>
            ) : (
              <div>
                <Link to={"/register"} className="m-2">
                  <Button variant="outlined" color="white" className="font-bold  !text-white">
                    Signup
                  </Button>
                </Link>
                <Link to={"/login"}>
                  <Button variant="outlined" color="white" className="font-bold  !text-white">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Logout Dialog */}
      <Logout open={open} handleClose={handleClose} />
    </nav>
  );
};

export default Navbar;
