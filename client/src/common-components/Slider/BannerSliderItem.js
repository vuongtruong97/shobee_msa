import React from 'react'

import styles from './BannerSliderItem.module.scss'

function SliderItem({ image_url, ...props }) {
    return (
        <div
            {...props}
            className={styles['slider-item']}
            style={{
                backgroundImage: `url(${image_url})`,
            }}
        ></div>
    )
}

export default SliderItem
