import React from 'react'
import styles from './DivStyle1.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function DivStyle1({ children, maxheight, ...props }) {
    return (
        <div {...props} className={cx('style1', { maxheight })}>
            {children}
        </div>
    )
}

export default DivStyle1
