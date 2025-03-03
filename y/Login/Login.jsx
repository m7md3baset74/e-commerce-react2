import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { AuthContext } from '../Context/AuthContext'
import { jwtDecode } from "jwt-decode"


export default function Login() {

let [msg,setMsg] = useState(null);
let [successMsg,setSuccessMsg] = useState(null);
let [loading,setLoading] = useState(false);
const navigate = useNavigate();
const {setToken} = useContext(AuthContext)

const validationSchema = yup.object({
    email:yup.string().required('email is required').email('please enter valid email'),
    password:yup.string().required('password is required').matches(/^[A-z0-9_]{8,20}$/,'password from 8 to 20 chars'),
  })

async function login(values){
  setMsg(null)
  setSuccessMsg(null)
  setLoading(true)
  try{
  const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
  console.log(res);
  setSuccessMsg(res.data.message);
  setToken(res.data.token);
  localStorage.setItem('token',res.data.token)
  console.log(jwtDecode(res.data.token));
   
  setTimeout(()=>{
    navigate('/')
  },1000)
  }catch(err){
    setMsg(err.response.data.message)
  }finally{
    setLoading(false)
  }
  
}
  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    onSubmit:login,
    validationSchema

    
  });
  return <>
  <div className='text-center text-5xl text-gray-400 mt-5 pt-10'>Login Now</div>

<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-10 rounded-lg shadow-lg ">

  <div className="relative z-0 w-full mb-5 group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
  </div>
  {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.email}
</div>:null}

  <div className="relative z-0 w-full group">
      <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.password}
</div>:null}
<div className='mb-3'>
    <Link className="text-blue-600" to='/forgotPassword'>
    Forgot Password ? 
    </Link>
  </div>
  <button type="submit" className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? 'loading...' : 'Login'}</button>
  {msg ?<div>{msg}</div>:null}
  {successMsg ?<div>{successMsg}</div>:null}
  
</form>

  </>
}
