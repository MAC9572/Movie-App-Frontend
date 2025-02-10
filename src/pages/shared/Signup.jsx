import React from 'react'
import { useForm } from 'react-hook-form';
import '../shared/Login.css'
import { axiosInstance } from '../../config/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({role}) => {
  const { register, handleSubmit } = useForm();
  const navigate =useNavigate()
  
  const user ={
    signupAPI : "/user/signup",
    loginRoute : "/login"
  }
  
  if(role =="admin"){
    user.signupAPI ="/admin/signup";
     user.loginRoute ="/admin/login"
  }





  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await axiosInstance({
        method: "POST", 
        url: user.signupAPI,
        data: data,
        headers: {
          'Content-Type': 'application/json', // Ensure proper content type
        },
      });
      console.log('Response:', response.data);
      // Handle successful login (e.g., redirect or save token)
      navigate('/user/profile')
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error, show error message to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-slate-300 dark:bg-gray-700">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name*/}
          <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            id="name"  {...register("name", { required: "Name is required" })}
            className= "w-full px-4 py-2 mt-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"               
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
          <input
            type="email"
            id="emailId"  {...register("emailId", { required: "EmailId is required" })}
            className= "w-full px-4 py-2 mt-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"               
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            id="password" {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

         {/* Password Input */}
         <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-sm font-semibold text-gray-700">Contact Number</label>
          <input
            type="number"
            id="contactNumber" {...register("contactNumber", { required: "Contact Number is required" })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contact No"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Location</label>
          <input
            type="text"
            id="location" {...register("location", { required: "Location is required" })}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="location"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Register
        </button>
      </form>

      {/* Register Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
        Already have an account? 
        <Link to ={user.loginRoute} className="text-blue-500 hover:text-blue-700">Login</Link></p>
      </div>
    </div>
  </div>
  );

};

export default Signup;