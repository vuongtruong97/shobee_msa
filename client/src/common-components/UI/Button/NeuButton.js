import React, { forwardRef } from 'react'

import styles from './NeuButton.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function NeuButton(
    {
        children,
        primary,
        disabled,
        fullwidth,

        rounded,
        ...props
    },
    ref
) {
    const classes = cx('button', {
        disabled,
        fullwidth,
        primary,
        rounded,
    })
    return (
        <button disabled={disabled} className={classes} {...props} ref={ref}>
            {children}
        </button>
    )
}

export default forwardRef(NeuButton)
