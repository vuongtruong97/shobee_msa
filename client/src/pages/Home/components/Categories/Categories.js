import React from 'react'

import classNames from 'classnames/bind'
import styles from './Categories.module.scss'
import CategoriesSlider from 'pages/Home/components/Categories/CategoriesSlider'

const cx = classNames.bind(styles)

function Categories() {
    return (
        <div className={cx('categories')}>
            <div className={cx('header')}>Danh Mục</div>
            <CategoriesSlider />
        </div>
    )
}

export default Categories
