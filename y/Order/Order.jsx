import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Order() {
    const [paymentWay,setPaymentWay] = useState()
    const {cartId,setNumOfCartItems} = useContext(CartContext);
    const navigate = useNavigate()
    function handleSubmit(values){
        console.log(values);
        if(paymentWay == 'cash'){
            cashOrder()
        }else if(paymentWay == 'visa'){
            visaOrder(values)
        }
    }
async function cashOrder(values){
    console.log('cashOrder');
    try{
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{headers:{
            token:localStorage.getItem('token')
        }})
        console.log(res);
        if(res.data.status == 'success'){
            toast.success('Order cash successfully')
            setNumOfCartItems(0)
            navigate('/allOrders')
        }
        
    }catch(error){console.log(error);}
}
async function visaOrder(values){
    console.log(window.location.origin);
    
    try{
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,values,{headers:{
            token:localStorage.getItem('token')
        }})
        console.log(res);
        window.open(res.data.session.url,'_blank')
    }catch(error){console.log(error);}
}

    const formik = useFormik({
        initialValues:{
            shippingAddress:{
                details:'' ,
                phone:'' ,
                city:'' 
                }
        },
        onSubmit:handleSubmit,
      });

  return <>
  <form onSubmit={formik.handleSubmit} className='pt-12'>
  <div className='max-w-md mx-auto py-6'>
   <div className="relative z-0 w-full mb-5 group">
      <input onChange={(e)=>{formik.setFieldValue('shippingAddress.details',e.target.value)}} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " required />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
  </div>
   <div className="relative z-0 w-full mb-5 group">
      <input onChange={(e)=>{formik.setFieldValue('shippingAddress.phone',e.target.value)}} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
   <div className="relative z-0 w-full mb-5 group">
      <input onChange={(e)=>{formik.setFieldValue('shippingAddress.city',e.target.value)}} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " required />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
  </div>
  <div className="flex">
    <div className="pl-2">
  <button onClick={()=>setPaymentWay('cash')} className='text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5'>cash order</button>
    </div>
    <div className="pl-2">
  <button onClick={()=>setPaymentWay('visa')} className='text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5'>visa order</button>
    </div>
  </div>
  </div>
  </form>
  </>
}
