import React from 'react'

import BannerSlider from 'common-components/Slider/BannerSlider'

import styles from './Banner.module.scss'

const DUMMY_SLIDER = [
    {
        id: 12,
        img_url: 'https://cf.shopee.vn/file/3a2dd7df04d32eafe2d8ae679287fe76_xxhdpi',
        alt: 'sale_6-6',
        target_url: '',
    },
    {
        id: 22,
        img_url: 'https://cf.shopee.vn/file/89e583b205e1069860ee7150f4a5bf97_xxhdpi',
        alt: 'sale_6-6',
        target_url: '',
    },
    {
        id: 32,
        img_url: 'https://cf.shopee.vn/file/1653a7e2377de0049716f655a71acb4b_xxhdpi',
        alt: 'sale_6-6',
        target_url: '',
    },
]

function Banner() {
    return (
        <div className='row'>
            <div className='col col-12 md-12 lg-8'>
                <BannerSlider sliders={DUMMY_SLIDER} />
            </div>
            <div className='col col-0 md-0 lg-4'>
                <div className={styles['sub-banner']}>
                    <div
                        className={styles['sub-banner-item']}
                        style={{
                            backgroundImage:
                                'url("https://cf.shopee.vn/file/cbc911a29a2807f970c6cec83708f199_xhdpi")',
                        }}
                    ></div>
                    <div
                        className={styles['sub-banner-item']}
                        style={{
                            backgroundImage:
                                'url("https://cf.shopee.vn/file/411cd49f0ef82eafb1bda88bd6db46ed_xhdpi")',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Banner
