import React from 'react'
import styles from './DivStyle2.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function DivStyle2({ children, hover, ...props }) {
    return (
        <div {...props} className={cx('style2', { hover })}>
            {children}
        </div>
    )
}

export default DivStyle2
