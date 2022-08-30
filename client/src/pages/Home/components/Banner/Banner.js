import React, { useEffect, useState } from 'react'

import BannerSlider from 'common-components/Slider/BannerSlider'

import styles from './Banner.module.scss'

import bannerAPI from 'services/banner-api/banner-api'

function Banner() {
    const [banners, setBanners] = useState([])

    useEffect(() => {
        ;(async () => {
            try {
                const result = await bannerAPI.getBanners()

                if (result.data.success) {
                    setBanners(result.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <div className='row'>
            <div className='col col-12 md-12 lg-8'>
                <BannerSlider sliders={banners} />
            </div>
            <div className='col col-0 md-0 lg-4'>
                {banners.length > 0 && (
                    <div className={styles['sub-banner']}>
                        <div
                            className={styles['sub-banner-item']}
                            style={{
                                backgroundImage: `url(${banners[0].image_url})`,
                            }}
                        ></div>
                        <div
                            className={styles['sub-banner-item']}
                            style={{
                                backgroundImage: `url(${banners[1].image_url})`,
                            }}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Banner
