import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import styles from './Profile.module.scss'
import Button from 'common-components/UI/Button/Button'
import fallBackAvatar from '../../../assets/images/fallback_ava.jpg'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'common-components/UI/Input/Input'
import Select from 'common-components/UI/Select/Select'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import userAPI from 'services/user-api/user-api'
import appendFormData from 'utils/appenFormData'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { userActions } from 'store/userSlice/userSlice'
import { useDispatch } from 'react-redux'
import giaoHangNhanhAPI from 'services/giao-hang-nhanh-api/ghn-api'

function Profile() {
    const userInfo = useSelector((state) => state.user.info)
    const dispatch = useDispatch()
    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])
    const [avatarUrlPreview, setAvatarUrlPreview] = useState()
    const [showUpdateAddress, setShowUpdateAddress] = useState(false)

    const schema = yup
        .object({
            birth_day: yup.string().required('Vui lòng nhập ngày sinh'),
            phone: yup.string().required().typeError('Số điện thoại không hợp lệ'),
            gender: yup.mixed().oneOf(['1', '2', '3']).required(),
            full_name: yup.string().required('Vui lòng nhập tên'),
            province:
                showUpdateAddress &&
                yup
                    .string()
                    .required('Vui lòng chọn Tỉnh thành')
                    .typeError('Vui lòng chọn Tỉnh thành'),
            district:
                showUpdateAddress &&
                listDistrict.length > 0 &&
                yup.string().required('Vui lòng chọn Quận/Huyện'),
            ward: listWard.length > 0 && yup.string().required('Vui lòng chọn Xã/Phường'),
        })
        .required()

    const {
        register,
        handleSubmit,
        watch,
        resetField,
        reset,
        formState: { errors, isDirty, dirtyFields },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            full_name: userInfo && userInfo?.full_name,
            gender: userInfo && userInfo?.gender?.toString(),
            birth_day: userInfo && userInfo?.birth_day,
            phone: userInfo && userInfo?.phone,
        },
    })

    console.log(errors)
    console.log(userInfo)

    useEffect(
        () =>
            reset({
                full_name: userInfo && userInfo?.full_name,
                gender: userInfo && userInfo?.gender?.toString(),
                birth_day: userInfo && userInfo?.birth_day,
                phone: userInfo && userInfo?.phone,
            }),
        [reset, userInfo]
    )

    const avatar = watch('avatar')
    const province = watch('province')
    const district = watch('district')

    console.log(province)
    console.log(district)

    useEffect(() => {
        let url
        if (avatar && avatar.length > 0) {
            url = URL.createObjectURL(avatar[0])
            setAvatarUrlPreview(url)
        }
        return () => {
            setAvatarUrlPreview(null)
            URL.revokeObjectURL(url)
        }
    }, [avatar])

    // get address api
    useEffect(() => {
        const getProvince = async () => {
            try {
                const res = await giaoHangNhanhAPI.getProvince()

                if (res.status === 200) {
                    setListProvince(res.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProvince()
    }, [])
    useEffect(() => {
        const getDistrict = async (province_id) => {
            try {
                const res = await giaoHangNhanhAPI.getDistrict(province_id)
                if (res.status === 200) {
                    if (res.data.data) {
                        setListDistrict(res.data.data)
                        // resetField('district')
                        // resetField('ward')
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (province) {
            getDistrict(JSON.parse(province).id)
        }
    }, [province])
    useEffect(() => {
        const getWard = async (districtId) => {
            try {
                const res = await giaoHangNhanhAPI.getWard(districtId)
                if (res.status === 200) {
                    resetField('ward')
                    if (res.data.data) {
                        setListWard(res.data.data)
                    } else {
                        setListWard([])
                    }
                }
            } catch (error) {}
        }
        if (district) {
            getWard(JSON.parse(district).id)
        }
    }, [district, province])

    const handlerShowUpdateAddress = () => {
        setShowUpdateAddress(!showUpdateAddress)
    }

    const onSubmit = async (data) => {
        try {
            const dirtyFieldsKeys = Object.keys(dirtyFields)

            Object.keys(data).forEach((atr) => {
                if (!dirtyFieldsKeys.includes(atr)) {
                    delete data[atr]
                }
            })

            console.log(data)

            if (isDirty && dirtyFieldsKeys.length > 0) {
                const result = await userAPI.updateUserInfo(appendFormData(data))
                if (result.data.success) {
                    dispatch(userActions.setUserInfo(result.data.data))
                    setShowUpdateAddress(false)
                }
                if (result.data.message) {
                    toast.success('Cập nhật thông tin thành công')
                }
            } else {
                toast.info('Không có thông tin nào thay đổi')
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    let avatarUrl
    if (!!userInfo.avatar_url) {
        avatarUrl = userInfo.avatar_url
    } else {
        avatarUrl = fallBackAvatar
    }

    return (
        <div className={styles.profile}>
            <div className={styles.head}>
                <h4>Hồ sơ của tôi</h4>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            {!isEmpty(userInfo) && (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.detail}>
                    <div className={styles.left}>
                        <div className={styles.user_info}>
                            <div className={styles.label}>Ảnh đại diện</div>
                            <div className={styles.value}>
                                <div
                                    className={styles.avatar}
                                    style={{
                                        backgroundImage: `url(${
                                            avatarUrlPreview
                                                ? avatarUrlPreview
                                                : avatarUrl
                                                ? avatarUrl
                                                : fallBackAvatar
                                        })`,
                                    }}
                                ></div>

                                <div className={styles.addressSelectWrap}>
                                    <label
                                        className={styles.chooseBtn}
                                        htmlFor='profile_avatar'
                                    >
                                        Chọn ảnh
                                    </label>
                                    <input
                                        {...register('avatar')}
                                        type='file'
                                        accept='.jpg,.jpeg,.png'
                                        hidden
                                        id='profile_avatar'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.user_info}>
                            <div className={styles.label}>Email</div>
                            <div className={styles.value}>{userInfo.email}</div>
                        </div>
                        <div className={styles.user_info}>
                            <div className={styles.label}>Địa chỉ</div>

                            <div className={styles.value}>
                                {!isEmpty(userInfo.address) &&
                                    `${userInfo.address?.ward?.name || ''}  -  ${
                                        userInfo.address.district.name
                                    }  -  ${userInfo.address.province.name}`}
                                &nbsp;&nbsp;
                                <span
                                    onClick={handlerShowUpdateAddress}
                                    className={styles.changeLink}
                                >
                                    Cập nhật
                                </span>
                            </div>
                        </div>
                        {showUpdateAddress && (
                            <>
                                <div className={styles.user_info}>
                                    <div className={styles.label}></div>
                                    <div className={styles.value}>
                                        <div className={styles.addressSelectWrap}>
                                            <label className={styles.addressLabel}>
                                                Tỉnh/Thành phố
                                            </label>
                                            <select
                                                className={styles.addressSelect}
                                                {...register('province')}
                                            >
                                                <option disabled selected value=''>
                                                    --Chọn--
                                                </option>
                                                {listProvince.map((prov) => (
                                                    <option
                                                        key={prov.ProvinceID}
                                                        value={JSON.stringify({
                                                            id: prov.ProvinceID,
                                                            name: prov.ProvinceName,
                                                        })}
                                                    >
                                                        {prov.ProvinceName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        &nbsp;
                                        <div className={styles.addressSelectWrap}>
                                            <label className={styles.addressLabel}>
                                                Quận/Huyện
                                            </label>
                                            <select
                                                className={styles.addressSelect}
                                                {...register('district')}
                                            >
                                                <option disabled selected value=''>
                                                    --Chọn--
                                                </option>
                                                {listDistrict.map((prov) => (
                                                    <option
                                                        key={prov.DistrictID}
                                                        value={JSON.stringify({
                                                            id: prov.DistrictID,
                                                            name: prov.DistrictName,
                                                        })}
                                                    >
                                                        {prov.DistrictName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        &nbsp;
                                        <div className={styles.addressSelectWrap}>
                                            <label className={styles.addressLabel}>
                                                Xã/Phường
                                            </label>
                                            <select
                                                className={styles.addressSelect}
                                                {...register('ward')}
                                            >
                                                <option disabled selected value=''>
                                                    --Chọn--
                                                </option>
                                                {listWard.map((prov) => (
                                                    <option
                                                        key={prov.WardCode}
                                                        value={JSON.stringify({
                                                            id: prov.WardCode,
                                                            name: prov.WardName,
                                                        })}
                                                    >
                                                        {prov.WardName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className={styles.user_info}>
                            <div className={styles.label}>Tên đầy đủ</div>
                            <div className={styles.value}>
                                <Input
                                    {...register('full_name')}
                                    error={errors.full_name?.message}
                                />
                            </div>
                        </div>

                        <div className={styles.user_info}>
                            <div className={styles.label}>Số điện thoại</div>
                            <div className={styles.value}>
                                <Input
                                    {...register('phone')}
                                    error={errors.phone?.message}
                                />
                            </div>
                        </div>

                        <div className={styles.user_info}>
                            <div className={styles.label}>Giới tính</div>
                            <div className={styles.value}>
                                <Select
                                    {...register('gender')}
                                    defaultSelect={userInfo?.gender}
                                    listOption={[
                                        { id: '1', name: 'Nam' },
                                        { id: '2', name: 'Nữ' },
                                        { id: '3', name: 'Khác' },
                                    ]}
                                    valueField='id'
                                    valueName='name'
                                    error={errors.gender?.message}
                                />
                            </div>
                        </div>
                        <div className={styles.user_info}>
                            <div className={styles.label}>Ngày sinh</div>
                            <div className={styles.value}>
                                <Input
                                    type='date'
                                    {...register('birth_day')}
                                    error={errors.birth_day?.message}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <Button disabled={!isDirty}>Lưu thay đổi</Button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Profile
