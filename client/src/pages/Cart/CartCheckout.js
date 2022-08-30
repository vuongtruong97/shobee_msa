import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './CartCheckout.module.scss'

function CartCheckout() {
    const location = useLocation()

    console.log(location)
    return <div>CartCheckout</div>
}

export default CartCheckout
