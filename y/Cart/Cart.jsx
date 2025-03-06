import React, { useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    getCartItems,
    allCartItems,
    updateItemCount,
    totalPrice,
    deleteCartItem,
    clearCart,
  } = useContext(CartContext);

  useEffect(() => {
    getCartItems();
  }, [allCartItems]);

  return (
    <>
      <div className="pt-22 mx-auto px-4 sm:px-8 lg:px-10">
        <h2 className="text-3xl sm:text-4xl font-semibold py-6 font-serif text-center">
          Total Price: <span className="text-green-500">${totalPrice}</span>
        </h2>

        {/* جدول المنتجات */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-2 py-3"></th>
                <th className="px-2 py-3">Product</th>
                <th className="px-2 py-3 text-center">Qty</th>
                <th className="px-2 py-3">Price</th>
                <th className="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {allCartItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-xl font-semibold text-gray-400 py-6"
                  >
                    Cart is Empty
                  </td>
                </tr>
              ) : (
                allCartItems.map((item) => (
                  <tr
                    key={item.product.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-1">
                      <img
                        src={item.product.imageCover}
                        className="w-16 sm:w-24 max-w-full"
                        alt="Product"
                      />
                    </td>
                    <td className="px-2 py-4 font-medium">{item.product.title}</td>
                    <td className="px-2 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          disabled={item.count === 1}
                          onClick={() =>
                            updateItemCount(item.product.id, item.count - 1)
                          }
                          className="w-8 h-8 bg-gray-200 rounded-full text-lg flex items-center justify-center hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="px-2 text-lg">{item.count}</span>
                        <button
                          onClick={() =>
                            updateItemCount(item.product.id, item.count + 1)
                          }
                          className="w-8 h-8 bg-gray-200 rounded-full text-lg flex items-center justify-center hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-1 py-4 font-medium">${item.price}</td>
                    <td className="px-1 py-4">
                      <button
                        onClick={() => deleteCartItem(item.product.id)}
                        className="text-red-600 hover:text-white bg-white border border-red-600 hover:bg-red-600 rounded-lg px-3 py-1 transition-all"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* الأزرار السفلية */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 py-8">
          <button
            onClick={clearCart}
            className="w-full sm:w-auto text-green-500 hover:text-white bg-white border border-green-500 hover:bg-green-500 rounded-lg px-6 py-2 text-lg transition-all"
          >
            Clear my cart
          </button>
          <Link to={"/order"} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto text-green-500 hover:text-white bg-white border border-green-500 hover:bg-green-500 rounded-lg px-6 py-2 text-lg transition-all">
              Continue order
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}