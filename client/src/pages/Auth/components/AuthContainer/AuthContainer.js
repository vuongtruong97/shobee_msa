import React from 'react'

import styles from './AuthContainer.module.scss'

function AuthContainer({ children }) {
    return (
        <div className={styles['auth-container']}>
            <div className='container'>
                <div className={`${styles['auth-body']} row`}>
                    <div className='col col-0 sm-0 lg-7  xl-7 md-6'>
                        <div style={{ backgroundImage: 'url("https://cf.shopee.vn/file/0075d6b0e24ec6feff5e055cfc918e73")' }} className={styles.banner}></div>
                    </div>
                    <div className='col col-11 sm-11 lg-5 xl-5 md-6'> {children}</div>
                </div>
            </div>
        </div>
    )
}

export default AuthContainer
