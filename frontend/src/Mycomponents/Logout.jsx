import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

export default function Logout({ open, handleClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogout = async()=>{
        try {
            const response = await axios.post('/user/logout');
            toast.success(response.data.message);
            navigate('/login');
            dispatch(getUser(null));
        } catch (error) {
            console.log(error);
            toast.error(error.response.message);
        }

    }

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Logout Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to log out?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="error">Cancel</Button>
        <Button onClick={() => {
            handleLogout(); // Call handleLogout here
          }}
          variant="contained" color="error">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}
