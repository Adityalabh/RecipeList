import "./App.css";
import Mainlayout from "./Mypages/Mainlayout";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Mypages/Register";
import Login from "./Mypages/Login";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import SavedRecipePage from "./Mypages/SavedRecipePage";


axios.defaults.baseURL = "https://recipelist-t55s.onrender.com";
axios.defaults.withCredentials = true;

function App() {

  // const {user} = useSelector((state) => state.user);
  // console.log("Redux user state after login:", user);
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Mainlayout />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/savedRecipe" element={<SavedRecipePage/>}/>

          
        </Routes>
        <ToastContainer position="top-center" />

      </BrowserRouter>
    </div>
  );
}

export default App;
