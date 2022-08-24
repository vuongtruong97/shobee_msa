import React, { useState, useEffect } from 'react'
import styles from './ProductsTable.module.scss'

import DivStyle1 from 'common-components/UI/Div/DivStyle1'
import Checkbox from 'common-components/UI/Checkbox/Checkbox'
import Rating from 'common-components/UI/Rating/Rating'
import Modal from 'common-components/UI/Modal/Modal'
import UpdateProdForm from '../ActionProductForm/UpdateProdForm'

import productAPI from 'services/product-api/product-api'
import numberWithCommas from 'utils/numberWithCommas'

import { FaSortAmountDown, FaSortAmountUp, FaEdit, FaTrash } from 'react-icons/fa'
import NeuButton from 'common-components/UI/Button/NeuButton'
import { Link } from 'react-router-dom'
import shopAPI from 'services/shop-api/shop-api'

function ProductsTable({ ...props }) {
    const [showConfirmDelele, setShowConfirmDelele] = useState(false)
    const [showUpdateProd, setShowUpdateProd] = useState(false)
    const [prodInfo, setProdInfo] = useState({})
    const [shopProducts, setShopProducts] = useState([])

    const getListProd = async () => {
        const res = await shopAPI.getMyShopProduct()
        setShopProducts(res.data.data)
    }

    useEffect(() => {
        getListProd()
    }, [])

    const handleEditProduct = async (id) => {
        try {
            const res = await productAPI.getProduct(id)
            setProdInfo(res.data.data)
            setShowUpdateProd(true)
        } catch (error) {
            console.log(error)
        }
    }
    const handleShowConfirmDelete = (id) => {
        setShowConfirmDelele(true)
    }

    return (
        <>
            {showConfirmDelele && (
                <Modal
                    onClose={() => {
                        setShowConfirmDelele(false)
                    }}
                ></Modal>
            )}
            {showUpdateProd && (
                <Modal
                    onClose={() => {
                        setShowUpdateProd(false)
                    }}
                >
                    <UpdateProdForm info={prodInfo} />
                </Modal>
            )}
            <DivStyle1>
                <div className={styles.tableContainer}>
                    <h1 className={styles.title}>DANH SÁCH SẢN PHẨM</h1>
                    <Link to='add' className={styles.actions}>
                        <NeuButton primary>Thêm sản phẩm</NeuButton>
                    </Link>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr}>
                                <th className={styles.th}>
                                    <div className={styles.proper}>
                                        <Checkbox />
                                    </div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>Hình ảnh</div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>
                                        Tên sản phẩm
                                        {true ? <FaSortAmountDown /> : <FaSortAmountUp />}
                                    </div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>
                                        Giá (VNĐ)
                                        {true ? <FaSortAmountDown /> : <FaSortAmountUp />}
                                    </div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>
                                        Kho hàng
                                        {true ? <FaSortAmountDown /> : <FaSortAmountUp />}
                                    </div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>
                                        Phân loại
                                        {true ? <FaSortAmountDown /> : <FaSortAmountUp />}
                                    </div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>
                                        Đã bán{' '}
                                        {true ? <FaSortAmountDown /> : <FaSortAmountUp />}
                                    </div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>
                                        Đánh giá
                                        {true ? <FaSortAmountDown /> : <FaSortAmountUp />}
                                    </div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>Thao tác</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {shopProducts.map(
                                ({
                                    name,
                                    price,
                                    quantity,
                                    status,
                                    sold,
                                    _id,
                                    image_urls,
                                }) => (
                                    <tr className={styles.tr} key={_id}>
                                        <td className={styles.td}>
                                            <Checkbox />
                                        </td>
                                        <td className={styles.td}>
                                            <div
                                                className={styles.productImg}
                                                alt='prod'
                                                style={{
                                                    backgroundImage: image_urls
                                                        ? `url(${image_urls[0]})`
                                                        : `url('https://cf.shopee.vn/file/46a2a2c810622f314d78455da5e5d926_xhdpi')`,
                                                }}
                                            />
                                        </td>
                                        <td className={styles.td}>{name}</td>
                                        <td className={styles.td}>
                                            {numberWithCommas(price)}
                                        </td>
                                        <td className={styles.td}>{`${quantity}`}</td>
                                        <td className={styles.td}>
                                            <div className={styles.status}>{status}</div>
                                        </td>
                                        <td className={styles.td}>{sold}</td>
                                        <td className={styles.td}>
                                            <Rating
                                                start={0}
                                                fractions={2}
                                                initialRating={3}
                                                readonly
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <div
                                                onClick={() => handleEditProduct(_id)}
                                                className={`${styles.action} ${styles.edit}`}
                                            >
                                                <FaEdit />
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleShowConfirmDelete(_id)
                                                }
                                                className={`${styles.action} ${styles.delete}`}
                                            >
                                                <FaTrash />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </DivStyle1>
        </>
    )
}

export default ProductsTable
