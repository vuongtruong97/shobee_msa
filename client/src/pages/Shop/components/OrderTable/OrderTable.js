import React, { useState } from 'react'
import styles from './OrderTable.module.scss'

import DivStyle1 from 'common-components/UI/Div/DivStyle1'
import numberWithCommas from 'utils/numberWithCommas'
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa'
import { BiConversation } from 'react-icons/bi'
import { handleStatus } from 'utils/handleOrderStatus'
import Modal from 'common-components/UI/Modal/Modal'

import ordersAPI from 'services/orders-api/orders-api'

function OrderTable({ data, onSetParams }) {
    const [showModal, setShowModal] = useState(false)
    const [orderUpdateId, setOrderUpdateId] = useState()
    const [orderUpdateInfo, setOrderUpdateInfo] = useState()
    const handleSetParams = (newParams) => {
        onSetParams((prev) => {
            return { ...prev, ...newParams }
        })
    }

    const handleChangeOrderStatus = async (id, body) => {
        const res = await ordersAPI.updateOrderStatus(id, body)

        if (res.data.success) {
            setOrderUpdateId('')
            handleSetParams({})
        }
    }

    return (
        <>
            <DivStyle1>
                <div className={styles.tableContainer}>
                    <h1 className={styles.title}>DANH SÁCH ĐƠN HÀNG</h1>
                    <div className={styles.filter}>
                        <div>
                            <label>Trạng thái đơn hàng</label>
                            <select
                                onChange={(e) => {
                                    handleSetParams({ status: e.target.value })
                                }}
                            >
                                <option disabled selected>
                                    Tất cả
                                </option>
                                <option value='PENDING'>Chờ xác nhận</option>
                                <option value='CONFIRM'>Chờ lấy hàng</option>
                                <option value='SHIPPING'>Đang vận chuyển</option>
                                <option value='COMPLETED'>Đã giao hàng</option>
                                <option value='CANCELLED'>Đã huỷ</option>
                                <option value='REFUND'>Trả hàng hoàn tiền</option>
                            </select>
                        </div>
                        <div>
                            <label>Số lượng đơn hàng mỗi trang</label>
                            <input
                                type='number'
                                onBlur={(e) => {
                                    handleSetParams({ limit: e.target.value })
                                }}
                                defaultValue={5}
                                placeholder='Limit'
                            />
                        </div>
                        <div>
                            <label>Sắp xếp</label>
                            <select
                                onChange={(e) => {
                                    handleSetParams({ limit: e.target.value })
                                }}
                            >
                                <option value=''>Mới nhất</option>
                                <option value=''>Giá cao</option>
                                <option value=''>Số lượng hàng</option>
                            </select>
                        </div>
                    </div>

                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tr}>
                                <th className={styles.th}>
                                    <div className={styles.proper}>STT</div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>Sản phẩm</div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>ID Đơn hàng</div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>Trạng thái</div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>
                                        Cập nhật trạng thái
                                    </div>
                                </th>
                                <th className={styles.th}>
                                    <div className={styles.proper}>Liên hệ người mua</div>
                                </th>
                            </tr>
                        </thead>
                        {data &&
                            data.map((order, i) => (
                                <tbody key={order.id}>
                                    <tr className={styles.tr} key={order.id}>
                                        <td className={styles.td}>{i + 1}</td>
                                        <td className={styles.td}>
                                            {order.products.map((prod) => (
                                                <div
                                                    className={styles.product}
                                                    key={prod.id._id}
                                                >
                                                    <div
                                                        className={styles.productImg}
                                                        alt='prod'
                                                        style={{
                                                            backgroundImage: prod.id
                                                                .image_url
                                                                ? `url(${prod.id.image_url})`
                                                                : `url('https://cf.shopee.vn/file/46a2a2c810622f314d78455da5e5d926_xhdpi')`,
                                                        }}
                                                    />
                                                    <div className={styles.prodName}>
                                                        {prod.id.name}
                                                    </div>
                                                    <div className={styles.prodQty}>
                                                        x{prod.quantity}
                                                    </div>
                                                </div>
                                            ))}
                                        </td>
                                        <td className={styles.td}>
                                            <div className={styles.orderId}>
                                                {order.id}
                                            </div>
                                        </td>
                                        <td className={styles.td}>
                                            <div className={styles.status}>
                                                {handleStatus(order.status)}
                                            </div>
                                        </td>

                                        <td className={styles.td}>
                                            {order.status === 'PENDING' ? (
                                                <div
                                                    onClick={() => {
                                                        handleChangeOrderStatus(
                                                            order.id,
                                                            { status: 'CONFIRM' }
                                                        )
                                                    }}
                                                    className={`${styles.action} ${styles.edit}`}
                                                >
                                                    Xác Nhận Đơn Hàng
                                                </div>
                                            ) : (
                                                <div
                                                    className={`${styles.action} ${styles.edit}`}
                                                    onClick={() => {
                                                        setOrderUpdateId(order.id)
                                                    }}
                                                >
                                                    {orderUpdateId === order.id ? (
                                                        <div>
                                                            <select
                                                                onChange={(e) => {
                                                                    if (
                                                                        e.target.value ===
                                                                        ''
                                                                    ) {
                                                                        return
                                                                    }
                                                                    setOrderUpdateInfo(
                                                                        e.target.value
                                                                    )
                                                                }}
                                                            >
                                                                <option selected value=''>
                                                                    --CHỌN--
                                                                </option>
                                                                <option value='SHIPPING'>
                                                                    Đang vận chuyển
                                                                </option>
                                                                <option value='COMPLETED'>
                                                                    Đã giao hàng
                                                                </option>
                                                            </select>
                                                            <button
                                                                onClick={() => {
                                                                    handleChangeOrderStatus(
                                                                        order.id,
                                                                        {
                                                                            status: orderUpdateInfo,
                                                                        }
                                                                    )
                                                                }}
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <FaEdit />
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className={styles.td}>
                                            <BiConversation />
                                            <div className={styles.chat}></div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                    </table>
                    {false && (
                        <h2 className={styles.emptyTableMessage}>
                            Cửa hàng hiện chưa có sản phẩm 🎄🎄🎄
                        </h2>
                    )}
                </div>
            </DivStyle1>
            {showModal && (
                <Modal
                    title='Cập nhật trạng thái đơn hàng'
                    onClose={() => {
                        setShowModal(false)
                    }}
                >
                    <div>trạng thái:</div>
                </Modal>
            )}
        </>
    )
}

export default OrderTable
