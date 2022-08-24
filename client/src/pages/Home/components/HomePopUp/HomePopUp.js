import React from 'react'

import styles from './HomePopUp.module.scss'

import { Link } from 'react-router-dom'

import { FaTimes } from 'react-icons/fa'

function HomePopUp({ ...props }) {
    return (
        <div className={styles.popup}>
            <div className={styles.backdrop}>
                <div className={styles.content}>
                    <Link to='#'>
                        <div className={styles.simpleBanner}>
                            <img
                                alt='home-popup'
                                src={`https://cf.shopee.vn/file/27c61cb2130f380e6421a303e136f1e8`}
                            />
                        </div>
                    </Link>
                    <div className={styles.closeBtnArea}>
                        <div onClick={props.onHide} className={styles.closeBtn}>
                            <FaTimes />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePopUp
