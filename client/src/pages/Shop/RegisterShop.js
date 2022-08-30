import React from 'react'

import FormRegisterShop from 'pages/Shop/components/RegisterShop/FormRegisterShop'
import PresentRegister from 'pages/Shop/components/RegisterShop/PresentRegister'

function RegisterShop() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#b52024',
                marginTop: '-2rem',
            }}
        >
            <div className='container'>
                <PresentRegister />
                <FormRegisterShop />
            </div>
        </div>
    )
}

export default RegisterShop
