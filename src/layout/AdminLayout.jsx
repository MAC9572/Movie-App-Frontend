import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { FooterPage } from '../components/user/FooterPage'
import { axiosInstance } from '../config/axiosInstance'
import AdminNavbar from '../components/admin/AdminNavbar'
import Navbar from '../components/admin/Navbar'
import { useSelector ,useDispatch } from 'react-redux'
import { clearAdmin,saveAdmin } from '../redux/features/adminSlice'


export const AdminLayout=()=> {
  const { isAdminAuth,userData } = useSelector((state) => state.admin);
  const dispatch = useDispatch()
    const location = useLocation()

    console.log("isAdminAuth====", isAdminAuth);

  const checkAdmin = async()=>{
    try{
      const response = await axiosInstance({
        method : "GET",
        url :"/admin/check-admin",
        Withcredentials: true,
      });
      
      dispatch(saveAdmin()) 
      console.log('response=', response)
    
    }catch(error){
    console.log(error)
    dispatch(clearAdmin())
    }}
   
  
  useEffect(()=>{
    checkAdmin()
  },[location.pathname])
  return (
    <div>
    {isAdminAuth === null ? (  // Show loading state while checking auth
      <div>Loading...</div>
    ) : (
      <div>
        {isAdminAuth ? <AdminNavbar/> : <Navbar/>}
        <div className="min-h-96">
          <Outlet /> {/* This renders the nested routes */}
        </div>
        <FooterPage/>
      </div>
    )}
  </div>
  )
}

