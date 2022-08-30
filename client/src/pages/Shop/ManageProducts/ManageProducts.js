import React, { useState, useEffect } from 'react'
import styles from './ManageProducts.module.scss'

import SearchProduct from '../components/SearchProduct/SearchProduct'
import ProductsTable from '../components/ProductsTable/ProductsTable'
import shopAPI from 'services/shop-api/shop-api'
import productAPI from 'services/product-api/product-api'
import { Outlet } from 'react-router-dom'

function ManageProducts() {
    const [shopProducts, setShopProducts] = useState([])

    const getListProd = async () => {
        const res = await productAPI.getListProd({
            limit: 30,
            sortBy: 'createdAt',
            order: -1,
        })
        setShopProducts(res.data.data)
    }

    useEffect(() => {
        getListProd()
    }, [])
    const handleRefreshPage = () => {
        getListProd()
        console.log('refresh')
    }
    return (
        <div className={styles.products_pages}>
            <SearchProduct onCreate={handleRefreshPage} />
            <Outlet />
        </div>
    )
}

export default ManageProducts
