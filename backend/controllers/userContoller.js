import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/userSchema.js";
import bcryptjs from "bcryptjs";

dotenv.config();
const jwtSecret = process.env.jwtSecret;


function getLoggedIdByReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    })
}

// User Registration
export const userRegister = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json("All fields are required");
        }

        const registeredUser = await User.findOne({ email });
        if (registeredUser) {
            return res.status(409).json("User already registered");
        }

        const bcryptSalt = await bcryptjs.genSalt(10);
        const newUser = await User.create({
            userName,
            email,
            password: bcryptjs.hashSync(password, bcryptSalt),
        });

        const { password: _, ...userDoc } = newUser.toObject();
        return res.json(userDoc);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// User Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json("Email and password are required");
        }

        const registeredUser = await User.findOne({ email });
        if (!registeredUser) {
            return res.status(404).json("User not found");
        }

        const passOk = bcryptjs.compareSync(password, registeredUser.password);
        if (!passOk) {
            return res.status(401).json("Incorrect password");
        }

        jwt.sign(
            { id: registeredUser._id, userName: registeredUser.userName },
            jwtSecret,
            {},
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json("Failed to generate token");
                }
                console.log(registeredUser);
                // const { password: _, ...userWithoutPassword } = registeredUser.toObject();
                // return res.cookie("token", token).json(registeredUser);
                return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
                    registeredUser,
                })
            }
        );
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Logout User
export const logOut = (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true }).json("User logged out");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Add Favorite Recipe
export const favouriteRecipe = async (req, res) => {
    try {
        const { id, title, summary, image, spoonacularSourceUrl } = req.body;
        if (id === null || !title || !summary || !image || !spoonacularSourceUrl) {
            res.status(400).json({ message: 'all fields are required' });
        }
        const currUserId = req.id;
        // console.log('currUserId in favRcip',currUserId,id, title, summary, image, spoonacularSourceUrl);

        const currUser = await User.findById(currUserId);
        if (!currUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isRecipeExists = currUser.favRecipe.some((recipe) => recipe?.recipeId === id);
        if (!isRecipeExists) {
            currUser.favRecipe.push({ recipeId: id, name: title, description: summary, image, sourceId: spoonacularSourceUrl });
            await currUser.save();
            return res.status(200).json({ message: "Recipe saved successfully" });
        }

        return res.status(409).json({ message: "Recipe already saved", currUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get Current User
export const currUser = async (req, res) => {
    try {
        const currUserId = req.id;
        const currUser = await User.findById(currUserId).select("-password"); // Exclude password field
        if (!currUser) {
            return res.status(404).json("User not found");
        }
        return res.json(currUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
