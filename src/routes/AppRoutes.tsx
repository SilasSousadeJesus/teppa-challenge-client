import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../components/navbar";
import { navlink } from "../components/navbar/dataNavLinks";
import CreateVehicle from "../pages/createVehicle/CreateVehicle";
import EditVehicle from "../pages/editVehicle/EditVehicle";
import Home from "../pages/home/Home";
import LoginPage from "../pages/login/LoginPage";
import Signup from "../pages/signup/Signup";
import Developed from "../pages/developed/Developed";
import Info from "../pages/info/Info";
import InfoUSer from "../pages/infoUser/InfoUSer";
import UserEdit from "../pages/userEdit/UserEdit";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Header navlink={navlink}/>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>  
          <Route path="/home" element={<Home />}></Route>
          <Route path="/developed" element={<Developed />}></Route>
          <Route path="/info" element={<Info />}></Route>
          <Route path="/myinfo" element={<InfoUSer />}></Route>
          <Route path="/myinfo/edituser/:id" element={<UserEdit />}></Route>
          <Route path="/createVehicle" element={<CreateVehicle />}></Route>
          <Route path="/editVehicle/:vehicle_id" element={<EditVehicle />}></Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
