import React from 'react'
import CartCard from './CartCard'
import chef from '../../assets/chef1.png'
import { useCartContext } from '../../Context/CartContext'

export const CartBody = () => {
     const { cart } = useCartContext();

  return (
    <div className='w-full h-full bg-cartBg flex items-center justify-center rounded-t-[2rem]'>
      {
        cart.length === 0 ? (
          <>
            <div className='w-full flex flex-col items-center gap-4'>
              <p className='text-2xl  text-[#b8b5b4] text-center pt-1 '>Your cart is Empty</p>
              <img src={chef} alt="" className='w-[250px] h-[250px]' />
            </div>
          </>
        ) : (
          <>
            {/* cart card */}
            <CartCard />
          </>
        )
      }

    </div>
  )
}
