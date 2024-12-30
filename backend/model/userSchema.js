import mongoose  from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    favRecipe:[{
        recipeId:{
            type:Number,
            default:null,
        },
        name:{
            type:String,
            default:null,
        },
        description:{
            type:String,
            default:null,
        },
        image:{
            type:String,
            default:"https://png.pngtree.com/png-vector/20191129/ourmid/pngtree-hand-drawn-fast-food-doodle-vector-set-of-fast-food-vector-png-image_2046737.jpg"
        },
        sourceId:{
            type:String,
            default:null
        },
    }]

},{timestamps:true});

export const User = mongoose.model("User",userSchema);