import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage=({role})=>{
  const navigate =useNavigate()
  
  const user ={
    home_route: role === 'admin' ? '/admin' : '/',
  }

  console.log('role =', role)
 

  return (
    <div>
      <h1>404! Page Not Found</h1>
      <button className="btn btn-primary btn btn-warning" onClick={()=>navigate(user.home_route)}>Navigate to Home</button>
    </div>
  )
}

export default ErrorPage