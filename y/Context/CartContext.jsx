import axios from 'axios';
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast';


export const CartContext = createContext();
export default function CartContextProvider({children}) {
    const [numOfCartItems,setNumOfCartItems] = useState();
    const [allCartItems,setAllCartItems] = useState([]);
    const [totalPrice,setTotalPrice] = useState([]);
    const [cartId,setCartId] = useState();

   async function addToCart(productId){
      try{
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId,},{
            headers:{token:localStorage.getItem('token')}
           })
           console.log(res);
           if(res.data.status == 'success'){
            toast.success('Successfully added!')

           }
            setNumOfCartItems(res.data.numOfCartItems)
      }catch(error){
        console.log(error,'errrrrrrr');
        toast.error('Something Went Wrong!')
      }
        
    }
    async function getCartItems(){
        try{
            const res = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
                headers:{token:localStorage.getItem('token')}
            })
            console.log(res);
            if(res.data.status == 'success'){
                setAllCartItems(res.data.data.products)
                setTotalPrice(res.data.data.totalCartPrice)
                setNumOfCartItems(res.data.numOfCartItems)
                setCartId(res.data.cartId)
                console.log(res.data.cartId,'carttiidd');
            }

        }catch(error){
            console.log(error,'errrrorrrr');
        }
    }
    async function updateItemCount(id,count){
        try{
            const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers:{
                token:localStorage.getItem('token')
            }})
            console.log(res);
            if(res.data.status == 'success'){
                setAllCartItems(res.data.data.products)
                setTotalPrice(res.data.data.totalCartPrice)
            }
        }catch(error){
            console.log(error,'errrrrr');
        }
    }
    async function deleteCartItem(id) {
        try{
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{
                token:localStorage.getItem('token')
            }})
            console.log(res);
            if(res.data.status == 'success'){
                setAllCartItems(res.data.data.products)
                setTotalPrice(res.data.data.totalCartPrice)
                setNumOfCartItems(res.data.numOfCartItems)
            }
        }catch(error){
            console.log(error,'errrrrr');
        }
    }

    async function clearCart() {
        try {
            const res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: { token: localStorage.getItem('token') }
            });
            console.log(res);
            if (res.data.status == 'success') {
                setAllCartItems([]);
                setTotalPrice(0); 
                setNumOfCartItems(0);
                toast.success('Cart cleared successfully!');
                setTimeout(()=>{window.location.reload();},500)
            }
        } catch (error) {
            console.log(error, 'errrrrr');
            toast.error('Failed to clear cart!');
        }
    }

  return <CartContext.Provider value={{addToCart,numOfCartItems,setNumOfCartItems,getCartItems,allCartItems,updateItemCount,totalPrice,deleteCartItem,cartId,clearCart}}>{children}</CartContext.Provider>
}
