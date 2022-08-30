import React from 'react'
import styles from './CategorySliderItem.module.scss'
import { Link } from 'react-router-dom'

function CategorySliderItem({ slug, image_url, id, ...props }) {
    return (
        <Link state={{ category: id }} to={`/category/${slug}`}>
            <div className={styles['category']}>
                <div
                    {...props}
                    className={styles['category-thumb']}
                    style={{
                        backgroundImage: `url(${image_url})`,
                    }}
                ></div>
                <p className={styles['category-name']}>{props.name}</p>
            </div>
        </Link>
    )
}

export default CategorySliderItem
