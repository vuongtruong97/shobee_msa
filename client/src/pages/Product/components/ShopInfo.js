import React from 'react'
import styles from './ShopInfo.module.scss'
import WrapStyle from './WrapStyle'

import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/vi'

import { useDispatch } from 'react-redux'
import { chatActions } from 'store/chatSlice/chatSlice'

function ShopInfo({ shopinfo }) {
    const dispatch = useDispatch()

    const handleSetCurrentChatId = (data) => {
        dispatch(chatActions.setCurrentChat(data))
    }

    return (
        <>
            {shopinfo && (
                <WrapStyle>
                    <div className='col col-12 sm-6 md-5 lg-4 xl-4'>
                        <div className={styles.shopActions}>
                            <div
                                className={styles.shopAva}
                                style={{
                                    backgroundImage: `url('https://cf.shopee.vn/file/9bb6bd07d3ee2e95bb19a3ec711c033d_tn')`,
                                }}
                            ></div>
                            <div className={styles.actions}>
                                <div className={styles.name}>{shopinfo.shop_name}</div>
                                <div className={styles.action}>
                                    <Link
                                        onClick={() => {
                                            handleSetCurrentChatId(shopinfo.shop_owner)
                                        }}
                                        to='#'
                                    >
                                        <button>Chat ngay</button>
                                    </Link>
                                    <Link to='#'>
                                        <button>Xem Shop</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col col-12 sm-6 md-7 lg-8 xl-8'>
                        <address className={styles.contacts}>
                            <div className={styles.contact}>
                                <div className={styles.contact_key}>Tên người bán :</div>
                                <div>{shopinfo.shop_contacts.name}</div>
                                <br></br>
                                <div className={styles.contact_key}>Sản phẩm :</div>
                                <div>{shopinfo.total}</div>
                            </div>
                            <div className={styles.contact}>
                                <div className={styles.contact_key}>Số điện thoại: </div>
                                <div>
                                    <a href={`tel:${shopinfo.shop_contacts.phones}`}>
                                        {shopinfo.shop_contacts.phones}
                                    </a>
                                </div>
                                <br></br>
                                <div className={styles.contact_key}>Tham gia: </div>
                                <a href={`tel:${shopinfo.shop_contacts.phones}`}>
                                    {moment(shopinfo.createdAt).startOf('day').fromNow()}
                                </a>
                            </div>
                            <div className={styles.contact}>
                                <div className={styles.contact_key}>Địa chỉ:</div>
                                <div>{shopinfo?.shop_contacts?.address?.detail}</div>
                            </div>
                        </address>
                    </div>
                </WrapStyle>
            )}
        </>
    )
}

export default ShopInfo
