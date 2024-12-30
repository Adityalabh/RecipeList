import express from "express";
import dotenv from "dotenv";
import { ConnectionDb } from "./utils/db.js";
import cors from "cors";
import userRouter from "./router/userRouter.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const _dirname = path.resolve();

dotenv.config();
app.use(cookieParser());

// const Port = 3000;
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use('/user',userRouter);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get("*",(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});




app.get("/test", (req, res) => {
    res.json('server is running');
})
const Port = process.env.Port;
app.listen(Port, () => {
    ConnectionDb();
    console.log(`server listening on port  ${Port}`);
})