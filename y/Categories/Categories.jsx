import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import UseCategories from '../Hooks/UseCategories'

export default function Categories() {
  const {allCat,isLoading} = UseCategories()
  
  return <>

<h2 className='text-center text-5xl font-medium text-green-500 p-7 pt-16'>Categories.</h2>
  <div className="grid gap-5 grid-cols-5 p-10">
  {allCat?.data.data.map((cat)=>{
    return <div key={cat._id}>
     <a href=""><img src={cat.image} alt="categ" className='w-full h-[300px] rounded shadow-green-200 shadow-2xl' /></a> 
     <a href=""><div className='text-lg text-green-500 font-bold text-center'>{cat.name} </div></a> 
    </div>
  })}

  </div>
  </>
}
