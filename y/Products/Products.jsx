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

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-10 px-3">
        {allPro?.data.data.map((prod) => (
          <ProductCart key={prod._id} product={prod} />
        ))}
      </div>
  </>
}
