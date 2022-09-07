import React, { useState } from 'react'
import styles from './ProductFilter.module.scss'
import Rating from 'common-components/UI/Rating/Rating'
import Button from 'common-components/UI/Button/Button'
import Checkbox from 'common-components/UI/Checkbox/Checkbox'

import { BiFilterAlt } from 'react-icons/bi'

function ProductFilter({ onFilter }) {
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState()

    return (
        <div className={styles.productFilter}>
            <h4 className={styles.title}>
                <BiFilterAlt />
                &nbsp; Bộ lọc tìm kiếm
            </h4>
            <div className={styles.filterDivision}>
                <span className={styles.subTitle}>Khoảng Giá</span>
                <div className={styles.filterPrice}>
                    <input
                        onChange={(e) => {
                            setMinPrice(e.target.value)
                        }}
                        type='number'
                        placeholder='₫ TỪ'
                    />
                    -
                    <input
                        onChange={(e) => {
                            setMaxPrice(e.target.value)
                        }}
                        type='number'
                        placeholder='₫ ĐẾN'
                    />
                </div>
                <Button
                    onClick={() => {
                        onFilter({ minPrice: minPrice, maxPrice: maxPrice })
                    }}
                >
                    Áp dụng
                </Button>
            </div>
            <div className={styles.filterDivision}>
                <span className={styles.subTitle}>Tình trạng</span>
                <div className={styles.filterStatus}>
                    <div>
                        <Checkbox
                            onChange={(e) => {
                                console.log(e.target.checked)
                                if (e.target.checked) {
                                    onFilter({ stt: 'OLD' })
                                }
                            }}
                        />
                        <label>&nbsp;Đã sử dụng</label>
                    </div>
                    <div>
                        <Checkbox
                            onChange={(e) => {
                                console.log(e.target.checked)
                                if (e.target.checked) {
                                    onFilter({ stt: 'NEW' })
                                }
                            }}
                        />
                        <label>&nbsp;Mới</label>
                    </div>
                </div>
            </div>
            <div className={styles.filterDivision}>
                <span className={styles.subTitle}>Đánh giá</span>
                <div className={styles.filterStar}>
                    <Rating readonly initialRating='5' />
                    <div>
                        <Rating readonly initialRating='4' />
                        &nbsp;<label>trở lên</label>
                    </div>
                    <div>
                        <Rating readonly initialRating='3' />
                        &nbsp;<label>trở lên</label>
                    </div>
                    <div>
                        <Rating readonly initialRating='2' />
                        &nbsp;<label>trở lên</label>
                    </div>
                    <div>
                        <Rating readonly initialRating='1' />
                        &nbsp;<label>trở lên</label>
                    </div>
                </div>
            </div>
            <div className={styles.filterDivision}>Đang giảm giá</div>
            <div>
                <button>Xoá tất cả</button>
            </div>
        </div>
    )
}

export default ProductFilter
