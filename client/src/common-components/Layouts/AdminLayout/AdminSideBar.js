import React from 'react'
import styles from './AdminSideBar.module.scss'
import { Link } from 'react-router-dom'

import { TbTruckDelivery, TbFileInvoice, TbChartLine, TbMessage2 } from 'react-icons/tb'
import { RiProductHuntLine, RiShoppingBag3Fill } from 'react-icons/ri'

function AdminSideBar() {
    const buttonStyle = {
        color: 'var(--text-primary-o)',
        justifyContent: 'start',
    }
    return (
        <div className={styles.sideBar}>
            <Link to='' className={styles.sideOption}>
                <TbChartLine />
                Số liệu
            </Link>
            <Link to='delivery' className={styles.sideOption}>
                <TbTruckDelivery />
                Shipment
            </Link>
            <Link to='order' className={styles.sideOption}>
                <TbFileInvoice />
                Đơn hàng
            </Link>
            <Link to='products' className={styles.sideOption}>
                <RiProductHuntLine />
                Sản phẩm
            </Link>

            <Link to='chat' className={styles.sideOption}>
                <TbMessage2 />
                Chats
            </Link>
            <Link to='setting' className={styles.sideOption}>
                <RiShoppingBag3Fill />
                Cài đặt
            </Link>
        </div>
    )
}

export default AdminSideBar
