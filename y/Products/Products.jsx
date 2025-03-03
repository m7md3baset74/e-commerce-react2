import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import UseProducts from './useProducts'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom'
import ProductCart from '../ProductCart/ProductCart'



export default function Products() {
  const {allPro,isLoading} = UseProducts()
  const {addToCart} = useContext(CartContext)
  
  return <>

<h2 className='text-center text-5xl font-medium text-green-500 p-7 pt-16'>All Products.</h2>

<div className="grid gap-5 grid-cols-5 p-10">
        {allPro?.data.data.map((prod) => (
          <ProductCart key={prod._id} product={prod} />
        ))}
      </div>
  </>
}
