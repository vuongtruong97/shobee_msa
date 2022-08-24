import React from 'react'

import styles from './ListProducts.module.scss'

import ProductItem from './ProductItem'
import SortBar from './SortBar'

import SmallSpinner from 'common-components/UI/LoadingSpinner/SmallSpinner'

function ListProducts({ listProducts, onFilter, onLoad, ...props }) {
    return (
        <div className={styles.ListProducts}>
            {onLoad && <SmallSpinner />}

            {!onLoad && (
                <>
                    <SortBar onFilter={onFilter} />
                    <div className='row'>
                        {listProducts.map((prod) => (
                            <ProductItem key={prod._id} data={prod} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default ListProducts
