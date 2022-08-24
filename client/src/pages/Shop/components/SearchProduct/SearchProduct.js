import React, { useState } from 'react'
import styles from './SearchProduct.module.scss'

import NeuButton from 'common-components/UI/Button/NeuButton'
import Modal from 'common-components/UI/Modal/Modal'
import AddProductForm from '../ActionProductForm/AddProductForm'

import DivStyle1 from 'common-components/UI/Div/DivStyle1'

import { FaSearch } from 'react-icons/fa'

function SearchProduct({ onCreate }) {
    const [showAddProd, setShowAddProd] = useState(false)

    const handleAddProduct = (e) => {
        e.preventDefault()
        setShowAddProd(true)
    }

    const onCreateProdSuccess = () => {
        setShowAddProd(false)
        onCreate()
    }

    return (
        <DivStyle1>
            <div className={styles.search}>
                <div className={styles.addProduct}>
                    <NeuButton primary onClick={handleAddProduct} rounded>
                        Thêm sản phẩm
                    </NeuButton>
                </div>
                <form className={styles.searchForm}>
                    <input className={styles.searchInput} placeholder='Search...' />
                    <NeuButton
                        primary
                        rounded
                        style={{ marginLeft: '1rem', minWidth: '7rem' }}
                    >
                        <FaSearch />
                    </NeuButton>
                </form>
                {showAddProd && (
                    <Modal
                        onClose={() => {
                            setShowAddProd(false)
                        }}
                    >
                        <AddProductForm onSuccess={onCreateProdSuccess} />
                    </Modal>
                )}
            </div>
        </DivStyle1>
    )
}

export default SearchProduct
