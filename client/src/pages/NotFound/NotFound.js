import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'common-components/UI/Button/Button'
function NotFound() {
    const navigate = useNavigate()
    return (
        <section
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h2 style={{ fontSize: '3rem' }}>(404) Không tìm thấy trang này 🍿🌭🍟</h2>
            <div style={{ display: 'flex', marginTop: '2rem' }}>
                <Link style={{ fontSize: '2.5rem' }} to='/'>
                    <Button>Về trang chủ</Button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    Quay lại
                </Button>
            </div>
        </section>
    )
}

export default NotFound
