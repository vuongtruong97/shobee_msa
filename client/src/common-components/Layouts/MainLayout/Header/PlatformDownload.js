import React from 'react'
import styles from './PlatformDownload.module.scss'

function PlatformDownload() {
    return (
        <div className={styles.platform}>
            <img
                className={styles.image}
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/d91264e165ed6facc6178994d5afae79.png'
            />
            <div className={styles.imagePlat}>
                <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/39f189e19764dab688d3850742f13718.png' />
                <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/f4f5426ce757aea491dce94201560583.png' />
                <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/1ae215920a31f2fc75b00d4ee9ae8551.png' />
            </div>
        </div>
    )
}

export default PlatformDownload
