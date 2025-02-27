import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

    const cartAmount = getCartAmount() || 0  // Avoids undefined cases
    const totalAmount = cartAmount === 0 ? 0 : cartAmount + (delivery_fee || 0) // Ensures valid addition

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1='Cart' text2='Total' />
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{cartAmount.toFixed(2)}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Shipping fee</p>
                    <p>{currency}{(delivery_fee || 0).toFixed(2)}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency}{totalAmount.toFixed(2)}</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
