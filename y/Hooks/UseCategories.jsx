import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'


export default function UseCategories() {
    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      }
      const {data:allCat,isLoading} = useQuery({
        queryKey:'allCategories',
        queryFn:getAllCategories
      })
  return {allCat,isLoading}
}
