import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userRegister, userLogin, googleLogin } from 'store/userSlice/userActions'
import { useForm } from 'react-hook-form'

import SocialLogin from '../../../../common-components/SocialLogin/SocialLogin'

import Input from '../../../../common-components/UI/Input/Input'
import Button from '../../../../common-components/UI/Button/Button'
import styles from './AuthForm.module.scss'
import 'react-toastify/dist/ReactToastify.css'

function AuthForm() {
    const { status } = useSelector((state) => state.user.notification)
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isLoading = status === 'loading'
    const isRegisterForm = location.pathname === '/auth/register'
    const formName = isRegisterForm ? 'Đăng ký' : 'Đăng nhập'

    //get path from page user want to visit in RequiredAuth component
    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        document.title = formName
    }, [formName])

    useEffect(() => {
        if (isLoggedIn && isRegisterForm) {
            navigate('/welcome', { replace: true })
        }
        if (isLoggedIn) {
            navigate(from, { replace: true })
        }
    }, [isLoggedIn, navigate, isRegisterForm, from])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const emailValidate = {
        required: 'Vui lòng nhập email !',
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    }
    const passwordValidate = {
        required: 'Vui lòng nhập mật khẩu !',
        minLength: 6,
        maxLength: 16,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    }
    const nameValidate = {
        maxLength: 20,
    }

    const socialLogin = () => {
        dispatch(googleLogin())
    }

    const formSubmitHandler = (data) => {
        if (isRegisterForm) {
            return dispatch(userRegister(data))
        }
        if (!isRegisterForm) {
            return dispatch(userLogin(data))
        }
    }

    return (
        <div className={styles.form} onSubmit={handleSubmit(formSubmitHandler)}>
            <div className={styles['form-header']}>
                <span>{formName}</span>
            </div>
            <form className={styles['form-body']}>
                {isRegisterForm && (
                    <div className={styles['form-input']}>
                        <Input
                            placeholder='First Name'
                            {...register('firstname', nameValidate)}
                        />
                        {errors.firstname && (
                            <p className={styles['error-message']}>
                                {errors.firstname.message}
                            </p>
                        )}
                        {errors.firstname?.type === 'maxLength' && (
                            <p className={styles['error-message']}>
                                Tên không dài quá 20 ký tự
                            </p>
                        )}
                    </div>
                )}
                {isRegisterForm && (
                    <div className={styles['form-input']}>
                        <Input
                            placeholder='Last Name'
                            {...register('lastname', nameValidate)}
                        />
                        {errors.lastname && (
                            <p className={styles['error-message']}>
                                {errors.lastname.message}
                            </p>
                        )}
                    </div>
                )}
                <div className={styles['form-input']}>
                    <Input placeholder='Email' {...register('email', emailValidate)} />
                    {errors.email && (
                        <p className={styles['error-message']}>{errors.email.message}</p>
                    )}
                    {errors.email?.type === 'pattern' && (
                        <p className={styles['error-message']}>
                            Email không đúng định dạng !
                        </p>
                    )}
                </div>
                <div className={styles['form-input']}>
                    <Input
                        type='password'
                        placeholder='Password'
                        {...register('password', passwordValidate)}
                    />
                    {errors.password && (
                        <p className={styles['error-message']}>
                            {errors.password.message}
                        </p>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <p className={styles['error-message']}>
                            Mật khẩu dài tối thiểu 6 ký tự
                        </p>
                    )}
                    {errors.password?.type === 'pattern' && (
                        <p className={styles['error-message']}>
                            Mật khẩu phải chứa chữ hoa, chữ thường vào số
                        </p>
                    )}
                </div>
                <div>
                    <Button disabled={isLoading} fullwidth type='submit'>
                        {isLoading ? 'Loading...' : `${formName}`}
                    </Button>
                </div>
                {isRegisterForm && (
                    <p>
                        Bằng việc đăng kí, bạn đã đồng ý với Shopee về{' '}
                        <Link to='/term-privary'>Điều khoản dịch vụ</Link> &#38;{' '}
                        <Link to='/term-privary'>Chính sách bảo mật</Link>
                    </p>
                )}
            </form>
            <SocialLogin />
            <div className={styles['form-footer']}>
                {isRegisterForm && (
                    <p>
                        Bạn đã có tài khoản &nbsp;
                        <Link to='/auth/login'>Đăng nhập</Link>
                    </p>
                )}
                {!isRegisterForm && (
                    <p>
                        Bạn chưa có tài khoản &nbsp;
                        <Link to='/auth/register'>Đăng ký</Link>
                    </p>
                )}
            </div>
        </div>
    )
}

export default AuthForm
