import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function UseProducts() {
    function getAllProducts(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
      }
      const {data:allPro,isLoading} = useQuery({
        queryKey:'allProducts',
        queryFn:getAllProducts
      })
  return {allPro,isLoading}
}