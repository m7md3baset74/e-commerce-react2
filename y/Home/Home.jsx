import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ProductCart from '../ProductCart/ProductCart';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';
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
  <div className="mx-auto pt-15 pb-8 sm:w-[640px] md:w-[768px] lg:w-[1190px]">
  <div className='grid grid-cols-6'>
    <div className='col-span-4 w-full'>

      <Swiper modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={10}
       slidesPerView={1} loop={true} style={{height:'100%'}}>
        <SwiperSlide>
          <img src={Slider1} alt="item" className='w-full h-full block' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slider2} alt="item" className='w-full h-full block' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slider3} alt="item" className='w-full h-full block' />
        </SwiperSlide>
      </Swiper>

    </div>
    <div className='col-span-2'>
    <img src={blogimg1} alt="item" className='h-1/2 w-full block' />
    <img src={blogimg2} alt="item" className='h-1/2 w-full block' />
    </div>
  </div>
  </div>


  <div className="mx-auto pb-9 sm:w-[640px] md:w-[768px] lg:w-[1050px] relative">
  <div className="absolute top-1/2 left-[-50px] z-10 -translate-y-1/2 cursor-pointer text-3xl text-green-600" id="prev-slide">
    ❮
  </div>
  <div className="absolute top-1/2 right-[-50px] z-10 -translate-y-1/2 cursor-pointer text-3xl text-green-600" id="next-slide">
    ❯
  </div>

  <Swiper
    modules={[Navigation]}
    navigation={{ nextEl: "#next-slide", prevEl: "#prev-slide" }}
    slidesPerView={7}
    loop={true}
  >
    {allCat?.data.data.map((cat) => (
      <SwiperSlide key={cat._id}>
        <img src={cat.image} alt="categorie" className="w-full h-[200px]" />
        <div>{cat.name}</div>
      </SwiperSlide>
    ))}
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
  <div className="mx-auto  sm:w-[640px] md:w-[768px] lg:w-[1190px]  ">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-10">
  {AllProductsData.map((prod)=><ProductCart product={prod} key={prod._id}/>)}
  </div>
  </div>}
  
  </>
}
