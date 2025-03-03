import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import { WishListContext } from '../Context/WishListContext';

export default function ProductCart(props) {
    
    let {addToWishList,removeWishList,isInWishList} =useContext(WishListContext)
    console.log(addToWishList,removeWishList,isInWishList);
    
    console.log(props);
    const {addToCart} = useContext(CartContext)
    const {title,imageCover,price,_id,description,ratingsAverage} = props.product ;
    let rating = Math.floor(ratingsAverage)
    const handleWishList = () => {
        if (isInWishList(_id)) {
            removeWishList(_id);
        } else {
            addToWishList(props.product);
        }
    };
    
  return <>

<div className="bg-white border border-green-200 rounded-lg shadow-green-200 shadow-sm hover:drop-shadow-lg dark:bg-gray-800 dark:border-gray-700">
    
<Link to={`/details/${_id}`}>
    <div>
        <img className="p-8 rounded-t-lg h-[300px] w-full " src={imageCover} alt="product image" />
    </div>
    <div className="px-5 pb-5">
        
        <div>
            <h5 className="text-xl font-medium tracking-tight text-green-400 dark:text-white">{title.slice(0,20)+'..'}</h5>
        </div>
        <p className="text-lg font-sans tracking-tight text-gray-500 dark:text-white">{description.slice(0,40)+'...'}</p>
        <div className="flex items-center mt-2.5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {Array.from({length:rating},(_,index)=>{
                    return <svg  key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                })}
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{ratingsAverage}</span>
            
            

        </div>
    </div>
</Link>

        <div className="flex items-center justify-between px-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">${price}</span>
            <button onClick={()=>{addToCart(_id)}} className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
        </div>

        <button className='pl-5' onClick={handleWishList}>
        <svg className={`w-9 h-9 cursor-pointer ${isInWishList(_id) ? 'text-red-600' : 'text-gray-500'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    </button>
</div>

 

  </>
}

