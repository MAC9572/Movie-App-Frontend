import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
    const { isAdminAuth, adminData } = useSelector((state) => state.admin);
    console.log("isadminAuth=====", isAdminAuth);
    // loading

    const navigate = useNavigate();

    // useEffect(() => {
    if (!isAdminAuth) {
        navigate("/admin/login");
        return;
    }
    // }, []);

    return <Outlet />;
};