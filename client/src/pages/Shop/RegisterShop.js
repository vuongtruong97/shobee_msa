import React from 'react'

import FormRegisterShop from 'pages/Shop/components/RegisterShop/FormRegisterShop'

function RegisterShop() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div className='container'>
                <FormRegisterShop />
            </div>
        </div>
    )
}

export default RegisterShop
