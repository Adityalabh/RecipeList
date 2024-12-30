import express  from "express";
import { isAuthenticate } from "../utils/auth.js";
import { currUser, favouriteRecipe, login, logOut, userRegister } from "../controllers/userContoller.js";
const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(userRegister);
router.route('/logout').post(isAuthenticate,logOut);
router.route('/currUser').get(isAuthenticate, currUser);
router.route('/likedRecipe').put(isAuthenticate,favouriteRecipe);

export default router;