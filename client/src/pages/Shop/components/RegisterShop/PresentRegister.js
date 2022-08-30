import React from 'react'

import RegisterShop1 from 'assets/images/nhabanhangtiemnang.jpg'
import RegisterShop2 from 'assets/images/taisaochonshobee.png'
import RegisterShop3 from 'assets/images/thamgiacongdongbanhang.jpg'

function PresentRegister() {
    return (
        <>
            <img style={{ width: '100%' }} src={RegisterShop1} />
            <img style={{ width: '100%' }} src={RegisterShop2} />
            <img style={{ width: '100%' }} src={RegisterShop3} />
            <div
                style={{
                    width: '100%',
                    color: '#fff',
                    textTransform: 'uppercase',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    fontSize: '3rem',
                    textAlign: 'center',
                    fontWeight: '700',
                    border: '2px solid #fff',
                }}
            >
                Trở thành nhà bán hàng tiềm năng của shobee ngay !
            </div>
        </>
    )
}

export default PresentRegister
