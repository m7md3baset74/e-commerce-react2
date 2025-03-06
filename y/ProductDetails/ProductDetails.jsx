import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CartContext } from '../Context/CartContext';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const [details, setDetails] = useState();
  const { id } = useParams();

  async function getProductDetails() {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    setDetails(data.data);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">

          <div className="md:col-span-2 flex justify-center">
            <Swiper
              modules={[Pagination,Autoplay]}
              pagination={{ clickable: true }}
              loop={true}
              slidesPerView={1}
              autoplay={{ delay: 1700, disableOnInteraction: false }}
  style={{ height: '100%' }}
              className="w-full max-w-sm md:max-w-md"
            >
              {details?.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Product ${index}`} className="w-full h-auto rounded-lg" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

         
          <div className="md:col-span-4 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold p-2">{details?.title}</h2>
            <span className="text-2xl md:text-3xl font-bold p-2">{details?.price}$</span>
            <div className="flex items-center gap-2">
              <i className="fa fa-star text-amber-400 text-xl"></i>
              <span className="bg-green-100 text-green-800 text-lg font-semibold px-2.5 py-0.5 rounded-sm">
                {details?.ratingsAverage}
              </span>
            </div>
            <p className="text-gray-600 p-2 md:pr-10">{details?.description}</p>

            <div className="flex justify-center md:justify-start mt-4">
              <button
                onClick={() => addToCart(details?._id)}
                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-16 py-3"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}