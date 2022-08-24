import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import BannerSlider from 'common-components/Slider/BannerSlider'
import ListProducts from 'common-components/ListProducts/ListProducts'

import categoryApi from 'services/category-api/category-api'

const DUMMY_SLIDER = [
    {
        id: 12,
        img_url: 'https://cf.shopee.vn/file/ec646971dd392d46741afd20dbed5b68',
        alt: 'sale_6-6',
        target_url: '',
    },
    {
        id: 22,
        img_url: 'https://cf.shopee.vn/file/bfff70387e50468d4e7fc29defa5a560',
        alt: 'sale_6-6',
        target_url: '',
    },
    {
        id: 32,
        img_url: 'https://cf.shopee.vn/file/3c1d9a59804c5a1e1e0922d51770b883',
        alt: 'sale_6-6',
        target_url: '',
    },
]

function Category() {
    const { category } = useParams()
    const [listProds, setListProds] = useState([])
    const [params, setParams] = useState({
        limit: 30,
    })

    const handleSetParams = (config) => {
        setParams({ ...params, ...config })
    }

    useEffect(() => {
        try {
            const fetch = async () => {
                const res = await categoryApi.getProdOfCate(category, params)

                setListProds(res.data.data)

                console.log(res)
            }

            fetch()
        } catch (error) {
            console.log(error)
        }
    }, [category, params])

    return (
        <div className='container'>
            <BannerSlider sliders={DUMMY_SLIDER} />
            <div className='row' style={{ marginTop: '2rem' }}>
                <div className='col col-0 sm-0 md-2 lg-2 xl-2'>
                    <h1>{category}</h1>
                </div>
                <div className='col col-12 sm-12 md-10 lg-10 xl-10'>
                    <ListProducts onFilter={handleSetParams} listProducts={listProds} />
                </div>
            </div>
        </div>
    )
}

export default Category
