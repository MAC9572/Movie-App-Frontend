import React, {useEffect } from 'react'
import { Outlet, useLocation,} from 'react-router-dom'
import Navbar from '../components/user/Navbar'
import { FooterPage } from '../components/user/FooterPage'
import UserNavbar from '../components/user/UserNavbar'
import { axiosInstance } from '../config/axiosInstance'
import { useSelector , useDispatch } from 'react-redux'
import { saveUser , clearUser } from '../redux/features/userSlice'


export const UserLayout=()=> {
  const { isUserAuth,userData } = useSelector((state) => state.user);
  const dispatch = useDispatch()
    const location = useLocation()


    console.log("isUserAuth====", isUserAuth);

  const checkUser = async()=>{
  try{
    const response = await axiosInstance({
      method : "GET",
      url :"/user/check-user",
      Withcredentials: true,
    });
    dispatch(saveUser())
    console.log('response=', response)
  
  }catch(error){
  dispatch(clearUser())
  console.log(error)
  }}

useEffect(()=>{
  checkUser()
},[location.pathname])



  return (
    <div>
      {isUserAuth === null ? (  // Show loading state while checking auth
        <div>Loading...</div>
      ) : (
        <div>
          {isUserAuth ? <UserNavbar/> : <Navbar />}
          <div className="min-h-96">
            <Outlet /> {/* This renders the nested routes */}
          </div>
          <FooterPage/>
        </div>
      )}
    </div>
  )
}

