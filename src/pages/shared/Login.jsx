import React from 'react'
import { useForm } from 'react-hook-form';
import '../shared/Login.css'
import { axiosInstance } from '../../config/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({role}) => {
  const { register, handleSubmit } = useForm();
  const navigate =useNavigate()

const user ={
  loginAPI : "/user/login",
  homepageRoute : "/user",
  signupRoute : "/signup"
}

if(role =="admin"){
  user.role ="admin"
  user.loginAPI ="/admin/login";
  user.homepageRoute ="/admin";
   user.signupRoute ="/admin/signup"
}


  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await axiosInstance({
        method: "POST", 
        url: user.loginAPI,
        data: data,
        headers: {
          'Content-Type': 'application/json', // Ensure proper content type
        },
      });
      toast.success('Login Success')
      console.log('Response:', response.data);
      // Handle successful login (e.g., redirect or save token)
      navigate(user.homepageRoute)
    } catch (error) {
      toast.error("Invalid credentials.");
      console.error("Login failed:", error);
      // Handle error, show error message to the user
    }
  };

  const handleGoogleLogin = () => {
    // Your Google login logic (for example, using Firebase or Google OAuth)
    console.log("Logging in with Google");
    // Implement actual Google login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6 bg-slate-300 dark:bg-gray-700">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password" {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border border-gray-300 text-gray-800 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-300"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google login"
              className="w-6 h-6 mr-2"
            />
            <span>Login with Google</span>
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to ={user.signupRoute} className="text-blue-500 hover:text-blue-700">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );

};

export default Login;