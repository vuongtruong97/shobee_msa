import React from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'

import styles from './Modal.module.scss'

const BackDrop = () => {
    return <div className={styles.backdrop}></div>
}
const OverLay = ({ children, onClose, ...props }) => {
    return (
        <div {...props} className={styles.modal}>
            <div onClick={onClose} className={styles.closeBtn}>
                <FaTimes />
            </div>
            <div className={styles.title}>Thêm mới sản phẩm</div>
            <div className={styles.body}>{children}</div>
        </div>
    )
}

const rootModal = document.getElementById('root-modal')

function Modal({ children, onClose, ...props }) {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop />, rootModal)}
            {ReactDOM.createPortal(
                <OverLay onClose={onClose} {...props}>
                    {children}
                </OverLay>,
                rootModal
            )}
        </>
    )
}

export default Modal
