import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Footer from '../y/Footer/Footer'
import Layout from '../y/Layout/Layout'
import Home from './../y/Home/Home';
import Cart from './../y/Cart/Cart';
import Products from './../y/Products/Products';
import Categories from './../y/Categories/Categories';
import Brands from './../y/Brands/Brands';
import Login from './../y/Login/Login';
import Register from './../y/Register/Register';
import Error from './../y/Error/Error';
import AuthContextProvider from '../y/Context/AuthContext';
import Guard from '../y/Guard/Guard';
import AuthGuard from '../y/AuthGuard/AuthGuard';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from '../y/ProductDetails/ProductDetails';
import CartContextProvider from '../y/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Wishlist from '../y/Wishlist/Wishlist';
import Order from '../y/Order/Order';
import AllOrders from '../y/AllOrders/AllOrders';
import WishListContextProvider from '../y/Context/WishListContext';
import ForgotPassword from '../y/ForgotPassword/ForgotPassword';
import ResetPassword from '../y/ResetPassword/ResetPassword';


const queryClient = new QueryClient()
const routes = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<Guard><Home/></Guard>},
    {path:'cart',element:<Guard><Cart/></Guard>},
    {path:'wishlist',element:<Guard><Wishlist/></Guard>},
    {path:'products',element:<Guard><Products/></Guard>},
    {path:'categories',element:<Guard><Categories/></Guard>},
    {path:'brands',element:<Guard><Brands/></Guard>},
    {path:'order',element:<Guard><Order/></Guard>},
    {path:'allorders',element:<Guard><AllOrders/></Guard>},
    {path:'details/:id',element:<Guard><ProductDetails/></Guard>},
    {path:'forgotpassword',element:<AuthGuard><ForgotPassword/></AuthGuard>},
    {path:'resetpassword',element:<AuthGuard><ResetPassword/></AuthGuard>},
    {path:'login',element:<AuthGuard><Login/></AuthGuard>},
    {path:'register',element:<AuthGuard><Register/></AuthGuard>},
    {path:'*',element:<Error/>},
  ]}
])
export default function App() {
  return <>
  <AuthContextProvider>
    <CartContextProvider>
      <WishListContextProvider>
    <QueryClientProvider client={queryClient}>
  <RouterProvider router={routes}/>
  <Toaster/>
    </QueryClientProvider>
      </WishListContextProvider>
    </CartContextProvider>
  </AuthContextProvider>
  </>
}
