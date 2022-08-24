import styles from './CategoriesArrow.module.scss'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function CateNextArr(props) {
    const { onClick } = props

    return (
        <div className={cx('arrow-btn', 'next')} onClick={onClick}>
            <IoIosArrowForward />
        </div>
    )
}

function CatePrevArrow(props) {
    const { onClick } = props
    return (
        <div className={cx('arrow-btn', 'prev')} onClick={onClick}>
            <IoIosArrowBack />
        </div>
    )
}

export { CateNextArr, CatePrevArrow }
