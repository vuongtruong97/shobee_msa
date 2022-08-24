import React from 'react'
import styles from './ProductDetail.module.scss'
import WrapStyle from './WrapStyle'

function ProductDetail({ product }) {
    return (
        <WrapStyle>
            <div className={styles.detail}>
                <h4 className={styles.title}>Chi tiết sản phẩm</h4>
                <div className={styles.listDetail}>
                    <div className='row'>
                        <div className='col col-5 md-6 lg-2'>
                            <span className={styles.detailName}>Danh mục</span>
                        </div>
                        <div className='col col-7 md-6 lg-10'>
                            <div className={styles.detailDes}>
                                {product?.category?.display_name}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col col-5 md-6 lg-2'>
                            <span className={styles.detailName}>Thương hiệu</span>
                        </div>
                        <div className='col col-7 md-6 lg-10'>
                            <div className={styles.detailDes}>
                                Đang phát triển...😖🙁🙁
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col col-5 md-6 lg-2'>
                            <span className={styles.detailName}>Kho hàng</span>
                        </div>
                        <div className='col col-7 md-6 lg-10'>
                            <div className={styles.detailDes}>{product?.quantity}</div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col col-5 md-6 lg-2'>
                            <span className={styles.detailName}>Gửi từ</span>
                        </div>
                        <div className='col col-7 md-6 lg-10'>
                            <div className={styles.detailDes}>
                                {product?.shop?.shop_contacts?.address[0].province}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.detail}>
                <h4 className={styles.title}>Mô tả</h4>
                <p className={styles.description}>{product?.description}</p>
            </div>
        </WrapStyle>
    )
}

export default ProductDetail
