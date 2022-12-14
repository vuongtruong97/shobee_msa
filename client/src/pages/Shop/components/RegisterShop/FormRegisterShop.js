import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from 'store/userSlice/userSlice'
import { ROLES } from 'constants/roles.constants'

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
    const userInfo = useSelector((state) => state.user.info)
    const [isLoading, setIsLoading] = useState(false)
    const [listProvince, setListProvince] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])
    const [listCate, setListCate] = useSessionStorage('list_cate', [])
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                // dispatch(userActions.setUserInfo({ ...userInfo, role: ROLES.SELLER }))
                navigate('/', { replace: true })
            }
        } catch (error) {
            toast.error(error.message)
        }

        console.log(data)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <header className={styles.header}>????NG K?? TH??NG TIN SHOP</header>
            <div className={styles.title}>TH??NG TIN LI??N H???</div>
            <Input
                {...register('shop_name', { required: 'T??n shop l?? b???t bu???c' })}
                label='T??n c???a h??ng'
                placeholder='Bee Shop...'
                error={errors.shop_name && errors.shop_name.message}
            />
            <Input
                {...register('contact_name', { required: 'Vui l??ng nh???p t??n li??n h???' })}
                label='T??n ch??? c???a h??ng'
                placeholder='Nguyen Van A...'
                error={errors.contact_name && errors.contact_name.message}
            />
            <Input
                {...register('contact_phone', {
                    required: 'Vui l??ng nh???p s??? ??i???n tho???i',
                })}
                type='number'
                label='S??? ??i???n tho???i li??n h???'
                placeholder='0866500...'
                error={errors.contact_phone && errors.contact_phone.message}
            />
            <Input
                {...register('contact_address', {
                    required: 'Vui l??ng nh???p ?????a ch??? c???a h??ng',
                })}
                label='?????a ch??? shop'
                placeholder='Ha Noi- Viet Nam'
                error={errors.contact_address && errors.contact_address.message}
            />
            <Select
                {...register('province', { required: 'Vui l??ng ch???n' })}
                valueName='ProvinceName'
                valueField='ProvinceID'
                label='T???nh/Th??nh Ph???'
                listOption={listProvince}
                error={errors.province && errors.province.message}
            />
            <Select
                {...register('district', {
                    required: listDistrict.length > 0 ? 'Vui l??ng ch???n' : false,
                })}
                valueName='DistrictName'
                valueField='DistrictID'
                label='Qu???n/Huy???n'
                listOption={listDistrict}
                error={errors.district && errors.district.message}
            />
            <Select
                {...register('ward', {
                    required: listWard.length > 0 ? 'Vui l??ng ch???n' : false,
                })}
                valueName='WardName'
                valueField='WardCode'
                label='X??/Ph?????ng'
                listOption={listWard}
                error={errors.ward && errors.ward.message}
            />

            <Select
                {...register('category')}
                valueName='display_name'
                valueField='id'
                label='Ng??nh h??ng'
                listOption={listCate}
            />
            <div className={styles.policy}>
                <input type='checkbox' required />
                <span>T??i ???? ?????c v?? ch???p nh???n c??c ??i???u kho???n d???ch v??? c???a Shobee</span>
            </div>
            <Button>????ng k?? shop</Button>
        </form>
    )
}

export default FormRegisterShop
