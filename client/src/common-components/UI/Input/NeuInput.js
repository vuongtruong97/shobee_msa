import React from 'react'

// useImperativeHandle collab with forwardRef

import styles from './NeuInput.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function NeuInput({ label, id, error, rounded, ...props }, ref) {
    // console.log(register, required)
    return (
        <div className={cx('neu_input')}>
            <label htmlFor={id}>{label}</label>
            <div className={cx('input-wrap', { error: error, rounded })}>
                <input ref={ref} id={id} {...props} />
            </div>
            {error && <span className={cx('error_message')}>{error}</span>}
        </div>
    )
}

export default React.forwardRef(NeuInput)
