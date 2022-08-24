import React from 'react'
import styles from './ProductSlider.module.scss'
import { default as SlickSlider } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { logDOM } from '@testing-library/react'

function ProductSlider({ image_urls }) {
    const settings = {
        customPaging: function (i) {
            return (
                <div
                    className={styles.prod_paging_img}
                    style={{ backgroundImage: `url(${image_urls[i]})` }}
                ></div>
            )
        },
        appendDots: (dots) => (
            <div
                style={{
                    top: '100%',
                    position: 'relative',
                    bottom: '0',
                }}
            >
                <ul className={styles.list_paging}>{dots}</ul>
            </div>
        ),
        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return (
        <div>
            <SlickSlider {...settings}>
                {image_urls &&
                    image_urls.map((url) => (
                        <div key={url}>
                            <div
                                className={styles.prod_slider_img}
                                style={{
                                    backgroundImage: `url(${url})`,
                                }}
                            ></div>
                        </div>
                    ))}
            </SlickSlider>
        </div>
    )
}

export default ProductSlider
