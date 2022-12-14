import React, { useState, useEffect, useRef } from 'react'
import styles from './HeaderSearch.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import productAPI from 'services/product-api/product-api'

import { FaShopify, FaSearch, FaShoppingCart } from 'react-icons/fa'
import MobileNav from './MobileNav'
import PopOver from 'common-components/UI/PopOver/PopOver'
import HeaderCart from './HeaderCart'
import EmptyCart from './EmptyCart'
import useOnclickOutSide from 'hooks/useOnClickOutSide'
import shobeeLogo from 'assets/images/logo2.png'

const cx = classNames.bind(styles)

function HeaderSearch() {
    const [showCart, setShowCart] = useState(false)
    const cart = useSelector((state) => state.user.cart)
    const isLogedIn = useSelector((state) => state.user.isLoggedIn)
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState()
    const [total, setTotal] = useState(0)
    const searchResultRef = useRef()

    useOnclickOutSide(searchResultRef, () => {
        handleResetSearch()
    })

    const handleResetSearch = () => {
        setSearchResult([])
        setSearchInput('')
    }

    useEffect(() => {
        const productTextSearch = async () => {
            try {
                if (!!searchInput) {
                    const result = await productAPI.getListProd({
                        keyword: searchInput,
                        limit: 8,
                    })
                    if (result.data.success) {
                        setSearchResult(result.data.data)
                        setTotal(result.data.totals)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        const timeId = setTimeout(() => {
            productTextSearch()
        }, 600)

        if (!searchInput) {
            setSearchResult([])
            setTotal(0)
        }

        return () => {
            clearTimeout(timeId)
        }
    }, [searchInput])

    return (
        <div className={cx('search')}>
            <MobileNav />
            <Link to='/' className={cx('logo')}>
                {/* <FaShopify />
                <span>Shobee</span> */}
                <img style={{ width: '150px' }} src={shobeeLogo} />
            </Link>
            <div className={cx('control')}>
                <div className={cx('form-search')}>
                    <form>
                        <input
                            onChange={(e) => {
                                setSearchInput(e.target.value)
                            }}
                            value={searchInput}
                            placeholder='Nh???p t??n s???n ph???m ????? t??m ki???m ...'
                        ></input>
                        <button>
                            <FaSearch />
                        </button>
                        {searchResult && searchInput && (
                            <div ref={searchResultRef} className={styles.searchResult}>
                                <div className={styles.resultInfo}>
                                    <div>
                                        K???t qu??? t??m ki???m t??? kho?? :
                                        <b>
                                            <i>{searchInput}</i>
                                        </b>
                                    </div>
                                    <div>
                                        T??m th???y <b>{total}</b> k???t qu???
                                    </div>
                                </div>
                                {searchResult.map((result) => (
                                    <Link
                                        onClick={handleResetSearch}
                                        to={`/product/${result.id}`}
                                        className={styles.resultInfo}
                                        key={result.id}
                                    >
                                        <div>{result.name}</div>
                                        <img
                                            className={styles.resultImage}
                                            src={result.image_urls[0]}
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </form>
                </div>
                <div className={cx('suggest')}>
                    <ul>
                        <li>V??y</li>
                        <li>D??p</li>
                        <li>??o ph??ng</li>
                        <li>T??i s??ch n???</li>
                        <li>??o thun</li>
                    </ul>
                </div>
            </div>
            <Link
                to={'/cart'}
                onMouseOver={() => {
                    setShowCart(true)
                }}
                onMouseLeave={() => {
                    setShowCart(false)
                }}
                className={cx('cart', 'nav-button')}
            >
                <FaShoppingCart />
                {isLogedIn && <div className={cx('cart-amount')}>{cart.total_items}</div>}
                <PopOver show={showCart} right>
                    {isLogedIn && cart?.products && (
                        <HeaderCart data={cart.products} total={cart.total_items} />
                    )}
                    {!isLogedIn && <EmptyCart />}
                </PopOver>
            </Link>
        </div>
    )
}

export default HeaderSearch
