import React from 'react'
import styles from './ProductFilter.module.scss'
import Rating from 'common-components/UI/Rating/Rating'
import Button from 'common-components/UI/Button/Button'

import { BiFilterAlt } from 'react-icons/bi'

function ProductFilter() {
    return (
        <div className={styles.productFilter}>
            <h4 className={styles.title}>
                <BiFilterAlt />
                &nbsp; Bộ lọc tìm kiếm
            </h4>
            <div className={styles.filterDivision}>
                <span className={styles.subTitle}>Khoảng Giá</span>
                <div className={styles.filterPrice}>
                    <input type='number' placeholder='₫ TỪ' /> -
                    <input type='number' placeholder='₫ ĐẾN' />
                </div>
                <Button>Áp dụng</Button>
            </div>
            <div className={styles.filterDivision}>
                <span className={styles.subTitle}>Tình trạng</span>
                <div className={styles.filterStatus}>
                    <div>
                        <input type='checkbox' />
                        <label>Cũ</label>
                    </div>
                    <div>
                        <input type='checkbox' />
                        <label>Mới</label>
                    </div>
                </div>
            </div>
            <div className={styles.filterDivision}>
                <span className={styles.subTitle}>Đánh giá</span>
                <div className={styles.filterStar}>
                    <Rating />
                    <Rating /> <label>4 sao trở lên</label>
                    <Rating />
                    <label>3 sao trở lên</label>
                    <Rating />
                    <label>2 sao trở lên</label>
                    <Rating />
                    <label>1 sao trở lên</label>
                </div>
            </div>
            <div className={styles.filterDivision}>Đang giảm giá</div>
            <div>Xoá tất cả</div>
        </div>
    )
}

export default ProductFilter
