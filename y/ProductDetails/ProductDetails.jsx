import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { CartContext } from '../Context/CartContext';
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";



export default function ProductDetails() {
  const {addToCart} = useContext(CartContext)
    let [details,setDetails] = useState()
    const det = useParams()
    async function getProductDetails(){
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${det.id}`)
    console.log(data.data);
    setDetails(data.data)
    
    }
    useEffect(()=>{
        getProductDetails()
    },[])
    
  return <>
  <div className="grid grid-cols-6 pt-15">
  <div className="col-span-2 pb-5">
  <Swiper
  modules={[Pagination]}
  pagination={{ clickable: true }}
  loop={true}
  slidesPerView={1}
  className="w-full max-w-lg mx-auto"
>
  {details?.images?.map((img, index) => (
    <SwiperSlide key={index}>
      <img src={img} alt={`Product ${index}`} className="w-full h-auto" />
    </SwiperSlide>
  ))}
</Swiper>
    </div>
    <div className="col-span-4 pt-34">
        <h2 className='text-4xl font-bold p-5'>{details?.title} </h2>
        <span className='text-4xl font-bold p-5'>{details?.price}$ </span>
        <i className='fa fa-star text-amber-400 text-xl '></i>
        <span className='bg-green-100 text-green-800 text-lg font-semibold px-2.5 py-0.5 rounded-sm'>{details?.ratingsAverage} </span>
        <p className='pr-35 pt-5 pl-5 pb-8'>{details?.description} </p>
        <div className='flex'>
        <button onClick={()=>{addToCart(details?._id)}} className=" block text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-55 py-2 text-center  mx-auto ">Add to cart</button>
        </div>

        
        
        

    </div>
  </div>
  
  
  </>
}
