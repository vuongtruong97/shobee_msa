import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './FormRegisterShop.module.scss'

import Input from 'common-components/UI/Input/Input'
import Select from 'common-components/UI/Select/Select'
import Button from 'common-components/UI/Button/Button'

import categoryApi from 'services/category-api/category-api'
import shopAPI from 'services/shop-api/shop-api'
import useSessionStorage from 'hooks/useSessionStorage'

import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import giaoHangNhanhAPI from 'services/giao-hang-nhanh-api/ghn-api'

function FormRegisterShop() {
    const [isLoading, setIsLoading] = useState(false)
    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])
    const [listCate, setListCate] = useSessionStorage('list_cate', [])
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        resetField,
    } = useForm({
        defaultValues: { province: null },
    })

    const province = watch('province')
    const district = watch('district')
    const ward = watch('ward')

    console.log(errors)

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
                        resetField('district')
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (province) {
            getDistrict(province)
        }
    }, [province])
    useEffect(() => {
        const getWard = async (districtId) => {
            try {
                const res = await giaoHangNhanhAPI.getWard(districtId)
                console.log(res)
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
            getWard(district)
        }
    }, [district, province])

    //get list category
    useEffect(() => {
        try {
            const fetchData = async () => {
                setIsLoading(true)
                const { data } = await categoryApi.getCategories()

                setListCate(data.data)
                setIsLoading(false)
            }
            if (listCate.length === 0) {
                fetchData()
            }
        } catch (error) {}
    }, [listCate, setListCate])

    const onSubmit = async (data) => {
        try {
            console.log(data)
            const result = await shopAPI.registerShop(data)

            if (result.data.success) {
                toast.success(result.data.message)
                navigate('/shop-manage', { replace: true })
            }
        } catch (error) {
            toast.error(error.message)
        }

        console.log(data)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <header className={styles.header}>ĐĂNG KÝ THÔNG TIN SHOP</header>
            <div className={styles.title}>THÔNG TIN LIÊN HỆ</div>
            <Input
                {...register('shop_name', { required: 'Tên shop là bắt buộc' })}
                label='Tên cửa hàng'
                placeholder='Bee Shop...'
                error={errors.shop_name && errors.shop_name.message}
            />
            <Input
                {...register('contact_name', { required: 'Vui lòng nhập tên liên hệ' })}
                label='Tên chủ cửa hàng'
                placeholder='Nguyen Van A...'
                error={errors.contact_name && errors.contact_name.message}
            />
            <Input
                {...register('contact_phone', {
                    required: 'Vui lòng nhập số điện thoại',
                })}
                type='number'
                label='Số điện thoại liên hệ'
                placeholder='0866500...'
                error={errors.contact_phone && errors.contact_phone.message}
            />
            <Input
                {...register('contact_address', {
                    required: 'Vui lòng nhập địa chỉ cửa hàng',
                })}
                label='Địa chỉ shop'
                placeholder='Ha Noi- Viet Nam'
                error={errors.contact_address && errors.contact_address.message}
            />
            <Select
                {...register('province', { required: 'Vui lòng chọn' })}
                valueName='ProvinceName'
                valueField='ProvinceID'
                label='Tỉnh/Thành Phố'
                listOption={listProvince}
                error={errors.province && errors.province.message}
            />
            <Select
                {...register('district', {
                    required: listDistrict.length > 0 ? 'Vui lòng chọn' : false,
                })}
                valueName='DistrictName'
                valueField='DistrictID'
                label='Quận/Huyện'
                listOption={listDistrict}
                error={errors.district && errors.district.message}
            />
            <Select
                {...register('ward', {
                    required: listWard.length > 0 ? 'Vui lòng chọn' : false,
                })}
                valueName='WardName'
                valueField='WardCode'
                label='Xã/Phường'
                listOption={listWard}
                error={errors.ward && errors.ward.message}
            />

            <Select
                {...register('category')}
                valueName='display_name'
                valueField='_id'
                label='Ngành hàng'
                listOption={listCate}
            />
            <div className={styles.policy}>
                <input type='checkbox' required />
                <span>Tôi đã đọc và chấp nhận các điều khoản dịch vụ của Shobee</span>
            </div>
            <Button>Đăng ký shop</Button>
        </form>
    )
}

export default FormRegisterShop
