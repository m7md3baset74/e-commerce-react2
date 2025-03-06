import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ProductCart from '../ProductCart/ProductCart';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from "swiper/modules";
import Slider3 from '../../src/assets/imgs/slider-image-1.jpeg';
import Slider2 from '../../src/assets/imgs/slider-image-2.jpeg';
import Slider1 from '../../src/assets/imgs/slider-image-3.jpeg';
import blogimg1 from '../../src/assets/imgs/grocery-banner-2.jpeg';
import blogimg2 from '../../src/assets/imgs/pexels.jpg';
import UseCategories from '../Hooks/UseCategories';



export default function Home() {
  const {allCat,isLoading:cataload} = UseCategories()
  
  async function getAllProducts(){
    
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  const {data,isLoading,isFetching} = useQuery({
    queryKey:'allProducts',
    queryFn:getAllProducts,
    refetchOnWindowFocus:false,
  })
  useEffect(()=>{
    getAllProducts()
  },[])
  const AllProductsData = data?.data.data

  
  return <>
  <div className="mx-auto pt-15 pb-8 container px-4 sm:px-4 md:px-4 lg:w-[1222px]">
  <div className='grid grid-cols-6'>
    <div className='col-span-4 w-full'>

    <Swiper
  modules={[Pagination, Autoplay]}
  pagination={{ clickable: true }}
  spaceBetween={10}
  slidesPerView={1}
  loop={true}
  autoplay={{ delay: 1700, disableOnInteraction: false }}
  style={{ height: '100%' }}
>
  <SwiperSlide>
    <img src={Slider1} alt="item" className="w-full h-full block" />
  </SwiperSlide>
  <SwiperSlide>
    <img src={Slider2} alt="item" className="w-full h-full block" />
  </SwiperSlide>
  <SwiperSlide>
    <img src={Slider3} alt="item" className="w-full h-full block" />
  </SwiperSlide>
</Swiper>

    </div>
    <div className='col-span-2'>
    <img src={blogimg1} alt="item" className='h-1/2 w-full block rounded' />
    <img src={blogimg2} alt="item" className='h-1/2 w-full block rounded' />
    </div>
  </div>
  </div>


 <div className="container mx-auto pb-9 px-4 sm:px-4 md:px-4 lg:w-[1160px] relative">

 <Swiper
  modules={[Navigation,Autoplay]}
  navigation={{
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  }}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  spaceBetween={7}
  breakpoints={{
    320: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 7 },
  }}
  loop={true}
  className="rounded-lg relative"
>
  {allCat?.data.data.map((cat) => (
    <SwiperSlide key={cat._id} className="text-center">
      <img
        src={cat.image}
        alt="category"
        className="w-full h-[180px] object-cover rounded-lg"
      />
      <div className="text-sm font-semibold mt-2">{cat.name}</div>
    </SwiperSlide>
 ))}

 <button className="swiper-button-prev text-white bg-black/30 p-1.5 rounded-full absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
   ❮
 </button>
 <button className="swiper-button-next text-white bg-black/30 p-1.5 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
   ❯
 </button>
</Swiper>
</div>

  

  {isLoading ? <div className='w-full h-screen flex justify-center items-center bg-white'>
    <ColorRing
  visible={true}
  height="100"
  width="100"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />

  </div>:
  <div className="mx-auto container px-4 sm:px-4 md:px-4 lg:w-[1222px]  ">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-10">
  {AllProductsData.map((prod)=><ProductCart product={prod} key={prod._id}/>)}
  </div>
  </div>}
  
  </>
}