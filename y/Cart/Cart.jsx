import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const {getCartItems,allCartItems,updateItemCount,totalPrice,deleteCartItem,clearCart} = useContext(CartContext)
  useEffect(()=>{
    getCartItems()
  },[allCartItems])
  return <>
  
<div className="relative overflow-x-auto pt-22  sm:rounded-lg mx-auto p-10 sm:w-[640px] md:w-[768px] lg:w-[1180px]">
<h2 className='text-4xl font-semibold py-10 font-serif'>Total Price: <span className='text-green-500'>${totalPrice}</span> </h2>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {allCartItems.length == 0 ?<tr className='text-3xl font-semibold text-gray-400'><td>Cart Is Empty</td></tr> :<>{allCartItems?.map((item)=> <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button disabled={item.count==1} onClick={()=>updateItemCount(item.product.id,item.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span >{item.count}</span>
            </div>
            <button onClick={()=>updateItemCount(item.product.id,item.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${item.price}
        </td>
        <td className="px-6 py-4">
          <button onClick={()=>{deleteCartItem(item.product.id)}} className="text-red-600 hover:text-white bg-white hover:bg-red-600 ring-1 hover:outline-none ring-red-600 focus:ring-black font-medium rounded-lg text-sm px-4 py-2 text-center">Remove</button>
        </td>
      </tr>)}
      </>}
    </tbody>
  </table>
</div>

<div className='flex justify-around  pb-10'>
<button onClick={clearCart} className='text-green-500 hover:text-white bg-white hover:bg-green-500 ring-1 hover:outline-none ring-green-500 focus:ring-black font-medium rounded-lg text-2xl px-4 py-2 text-center'>Clear my cart</button>
<Link to={'/order'}>
<button className='text-green-500 hover:text-white bg-white hover:bg-green-500 ring-1 hover:outline-none ring-green-500 focus:ring-black font-medium rounded-lg text-2xl px-4 py-2 text-center'>Continue order</button>
</Link>
</div>


  </>
}
