import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function UseBrands() {
    function getAllBrands(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      }
      const {data:allBrands,isLoading} = useQuery({
        queryKey:'allBrands',
        queryFn:getAllBrands
      })
  return {allBrands,isLoading}
}