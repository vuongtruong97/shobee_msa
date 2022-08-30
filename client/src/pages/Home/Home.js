import React, { useEffect, useState } from 'react'
import useSessionStorage from 'hooks/useSessionStorage'

import Banner from 'pages/Home/components/Banner/Banner'
import Categories from 'pages/Home/components/Categories/Categories'
import ListProductHeading from 'pages/Home/components/ListProductHeading/ListProductHeading'
import HomePopUp from 'pages/Home/components/HomePopUp/HomePopUp'
import ListProducts from 'common-components/ListProducts/ListProducts'
import productAPI from 'services/product-api/product-api'

function Home() {
    // doing first visit
    const [firstVisit, setFirstVisit] = useSessionStorage('first visit', true)
    const [listProducts, setListProducts] = React.useState([])
    const [isLoading, setIsloading] = React.useState(false)

    const [params, setParams] = useState({
        limit: 30,
        sortBy: 'createdAt',
        order: -1,
    })

    const handleSetParams = (config) => {
        setParams({ ...params, ...config })
    }

    useEffect(() => {
        const beforeUnload = () => {
            setFirstVisit(false)
        }
        window.addEventListener('beforeunload', beforeUnload)
        document.title = 'Shoppe React'

        return () => {
            window.removeEventListener('beforeunload', beforeUnload)
        }
    }, [setFirstVisit])

    useEffect(() => {
        try {
            const getListProd = async () => {
                setIsloading(true)
                const res = await productAPI.getListProd(params)

                setListProducts(res.data.data)
                setIsloading(false)
            }
            getListProd()
        } catch (error) {
            console.log(error)
        }
    }, [params])

    const handleFirstVisit = () => {
        console.log('run run')
        setFirstVisit(false)
    }

    return (
        <div className='container'>
            {firstVisit && <HomePopUp onHide={handleFirstVisit} />}
            <Banner />
            <Categories />
            <ListProductHeading />
            <ListProducts
                onFilter={handleSetParams}
                sortBar={false}
                onLoad={isLoading}
                listProducts={listProducts}
            />
        </div>
    )
}

export default Home
