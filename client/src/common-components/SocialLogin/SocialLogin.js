import React from 'react'
// import GoogleLogin from 'react-google-login'
// import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

import styles from './SocialLogin.module.scss'

function SocialLogin() {
    // const onSuccess = (data) => {
    //     console.log(data)
    // }
    return (
        <div className={styles['social-login']}>
            <button>
                <FaFacebook />
                Facebook
            </button>
            <span />
            {/* <GoogleLogin
                onSuccess={onSuccess}
                clientId='226968612053-meug3cctupe4snuchjc9n0ear6beb1h4.apps.googleusercontent.com'
                render={({ ...props }) => (
                    <button {...props}>
                        <FcGoogle />
                        Google
                    </button>
                )}
            /> */}
        </div>
    )
}

export default SocialLogin
