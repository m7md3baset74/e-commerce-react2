import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import UseBrands from './useBrands'


export default function Brands() {
  const {allBrands,isLoading} = UseBrands()
  
  return <>

<h2 className='text-center text-5xl font-medium text-green-500 p-7 bg-gray-100 pt-16'>All Brands.</h2>

  <div className="grid gap-5 grid-cols-5 p-10 bg-gray-100 ">
  {allBrands?.data.data.map((brnd)=>{
    return <div key={brnd._id}>
     <img src={brnd.image} alt="brands" className='w-full h-[250px] rounded hover:shadow-xl hover:shadow-green-200' />
     <div className='text-lg text-green-500 font-bold text-center'>{brnd.name} </div> 
    </div>
  })}

  </div>
  </>
}

