import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [WishList, setWishList] = useState([]);
  let headers = { token: localStorage.getItem('token') };

  async function getWishList() {
    try {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers});
      setWishList(res.data.data || []);
      localStorage.setItem('WishList', JSON.stringify(res.data.data));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  }

  async function addToWishList(product) {
    try {
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId: product._id },
        { headers:{token:localStorage.getItem('token')}}
      );
      let updatedList = [...WishList, product];
      setWishList(updatedList);
      localStorage.setItem('WishList', JSON.stringify(updatedList));
      console.log('Added to wishlist:',res.data);
      
    } catch (error) {
      console.error('Error adding to wishlist:', error.response?.data ||error);
    }
  }

  async function removeWishList(productId) {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
      let filteredProduct = WishList.filter((item) => item._id !== productId);
      setWishList(filteredProduct);
      localStorage.setItem('WishList', JSON.stringify(filteredProduct));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }

  const isInWishList = (productId) => {
    return WishList.some((item) => item._id === productId);
  };

  useEffect(() => {
      getWishList();
    }, []);

  return (
    <WishListContext.Provider value={{ WishList, addToWishList, removeWishList, getWishList, isInWishList }}>
      {children}
    </WishListContext.Provider>
  );
}