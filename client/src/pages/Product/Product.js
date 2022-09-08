import React, { useEffect, useState } from 'react'
import ProductDetail from './components/ProductDetail'
import ProductInfo from './components/ProductInfo'
import ShopInfo from './components/ShopInfo'
import ProductRating from './components/ProductRating'
import { useParams } from 'react-router-dom'
import productAPI from 'services/product-api/product-api'
import SmallSpinner from 'common-components/UI/LoadingSpinner/SmallSpinner'

function Product() {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [isLoading, setIsloading] = useState(false)
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }, [])
    useEffect(() => {
        try {
            const fetchData = async () => {
                setIsloading(true)
                const res = await productAPI.getProduct(id)

                setProduct(res.data.data)
                setIsloading(false)
            }

            fetchData()
        } catch (error) {
            console.log(error)
        }
    }, [id])

    return (
        <div className='container'>
            {isLoading && <SmallSpinner />}
            <ProductInfo product={product} />
            <ShopInfo shopinfo={product.shop} />
            <ProductDetail product={product} />
            <ProductRating product={product}>Product Rating</ProductRating>
        </div>
    )
}

export default Product
