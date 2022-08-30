import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import BannerSlider from 'common-components/Slider/BannerSlider'
import ListProducts from 'common-components/ListProducts/ListProducts'

import productAPI from 'services/product-api/product-api'
import bannerAPI from 'services/banner-api/banner-api'
import ProductFilter from './components/ProductFilter'

function Category() {
    const location = useLocation()
    const { category } = useParams()
    const [listProds, setListProds] = useState([])
    const [banners, setBanners] = useState([])
    const [params, setParams] = useState({
        limit: 30,
    })

    const handleSetParams = (config) => {
        setParams({ ...params, ...config })
    }
    const categoryId = location.state.category || undefined

    useEffect(() => {
        try {
            ;(async () => {
                const res = await productAPI.getListProd({
                    category: categoryId,
                    limit: 30,
                })
                if (res.data.success) {
                    setListProds(res.data.data)
                }
            })()
            ;(async () => {
                const res = await bannerAPI.getBanners()
                console.log(res)
                if (res.data.success) {
                    setBanners(res.data.data)
                }
            })()
        } catch (error) {
            console.log(error)
        }
    }, [category, params])

    return (
        <div className='container'>
            <BannerSlider sliders={banners} />
            <div className='row' style={{ marginTop: '2rem' }}>
                <div className='col col-0 sm-0 md-2 lg-2 xl-2'>
                    <ProductFilter />
                </div>
                <div className='col col-12 sm-12 md-10 lg-10 xl-10'>
                    <ListProducts
                        sortBar
                        onFilter={handleSetParams}
                        listProducts={listProds}
                    />
                </div>
            </div>
        </div>
    )
}

export default Category
