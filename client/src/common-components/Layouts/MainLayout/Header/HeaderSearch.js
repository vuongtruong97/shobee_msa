import React, { useState } from 'react'
import styles from './HeaderSearch.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { FaShopify, FaSearch, FaShoppingCart } from 'react-icons/fa'
import MobileNav from './MobileNav'
import PopOver from 'common-components/UI/PopOver/PopOver'
import HeaderCart from './HeaderCart'

const cx = classNames.bind(styles)

function HeaderSearch() {
    const [showCart, setShowCart] = useState(false)
    const cart = useSelector((state) => state.user.cart)

    return (
        <div className={cx('search')}>
            <MobileNav />
            <Link to='/' className={cx('logo')}>
                <FaShopify />
                <span>Shobee</span>
            </Link>
            <div className={cx('control')}>
                <div className={cx('form-search')}>
                    <form>
                        <input placeholder='Săn sale công nghệ ...'></input>
                        <button>
                            <FaSearch />
                        </button>
                    </form>
                </div>
                <div className={cx('suggest')}>
                    <ul>
                        <li>Váy</li>
                        <li>Dép</li>
                        <li>Áo phông</li>
                        <li>Túi sách nữ</li>
                        <li>Áo thun</li>
                    </ul>
                </div>
            </div>
            <div
                onMouseOver={() => {
                    setShowCart(true)
                }}
                onMouseLeave={() => {
                    setShowCart(false)
                }}
                className={cx('cart', 'nav-button')}
            >
                <FaShoppingCart />
                {cart?.totals > 0 && (
                    <div className={cx('cart-amount')}>{cart.totals}</div>
                )}
                <PopOver show={showCart} right>
                    {cart?.data && <HeaderCart data={cart.data} />}
                </PopOver>
            </div>
        </div>
    )
}

export default HeaderSearch
