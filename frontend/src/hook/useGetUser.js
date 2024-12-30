import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";

export const useGetUser = ()=>{
    const { userRefresh} = useSelector(store => store.user);
    const dispatch = useDispatch();
    try {
        useEffect(() => {
            try {
              axios.get(`/user/currUser`).then((res) => {
                dispatch(getUser(res.data));
              });
            } catch (error) {
              console.log(error.message);
            }
          }, [userRefresh,dispatch]);
    } catch (error) {
        console.log(error);
    }
}