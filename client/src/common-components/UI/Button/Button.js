import React, { forwardRef } from 'react'

import styles from './Button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Button(
    {
        children,
        primary,
        error,
        success,
        warning,
        link,
        disabled,
        fullwidth,
        social,
        rounded,
        secondary,
        ...props
    },
    ref
) {
    const classes = cx('button', {
        success,
        warning,
        link,
        error,
        disabled,
        fullwidth,
        primary,
        social,
        rounded,
        secondary,
    })
    return (
        <button disabled={disabled} className={classes} {...props} ref={ref}>
            {children}
        </button>
    )
}

export default forwardRef(Button)
