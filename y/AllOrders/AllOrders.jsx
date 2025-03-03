import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'



export default function AllOrders() {
    const [allOrders,setAllOrders] = useState([])
   async function getAllOrders(){
    const {id} = jwtDecode(localStorage.getItem('token'))
    console.log(id);
    
    try{
        const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        console.log(res);
        setAllOrders(res.data)
    }catch(error){console.log(error,'errrrrr');}
   }
   useEffect(()=>{
    getAllOrders()
   },[])
   
  return <>
  <h2 className='text-center text-5xl font-medium text-green-500 p-7 pt-12'>My Orders.</h2>

  <div className='pl-5 grid grid-cols-3'>
  {allOrders?.map((order)=> <> 
  <div className='p-2'>
   <h1 className='text-2xl font-medium bg-gray-100 rounded p-1'> price:{'$'}{order.totalOrderPrice}</h1>
   <h1 className='text-red-600 bg-gray-100 rounded p-1'> date:{order.updatedAt}</h1>
   <h1 className='text-red-600 bg-gray-100 rounded p-1'>cart:{order.paymentMethodType}</h1>
   <h1 className='text-red-600 bg-gray-100 rounded p-1'>id:{order.id}</h1>

  </div>

  </>
  )}
  </div>
  
  


  </>
}
