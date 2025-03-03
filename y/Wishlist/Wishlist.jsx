import React, { useContext, useEffect } from "react";
import { WishListContext } from "../Context/WishListContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  let { getWishList, WishList, removeWishList } = useContext(WishListContext);

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <>
      <h2 className="text-center text-5xl font-medium text-green-500 p-7 pt-16">
        My Wishlist.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 pb-6">
        {WishList.length > 0 ? (
          WishList.map((product) => (
            <div key={product._id} className="bg-white border border-green-200 rounded-lg shadow-md p-4 relative">
             
              <button
                onClick={() => removeWishList(product._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ❌
              </button>

              <Link to={`/details/${product._id}`}>
                <img className="w-full h-40 object-cover rounded" src={product.imageCover} alt={product.title} />
                <h3 className="mt-2 text-lg font-medium text-gray-700">{product.title}</h3>
                <p className="text-green-500 font-bold">${product.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-2xl text-gray-500 font-medium">No items in wishlist.</p>
        )}
      </div>
    </>
  );
}
