import React, { useEffect } from 'react'
import styles from './AddProductForm.module.scss'
import NeuInput from 'common-components/UI/Input/NeuInput'
import NeuButton from 'common-components/UI/Button/NeuButton'
import Select from 'common-components/UI/Select/Select'
import useSessionStorage from 'hooks/useSessionStorage'
import categoryApi from 'services/category-api/category-api'
import appendFormData from 'utils/appenFormData'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import productAPI from 'services/product-api/product-api'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import toastPromise from 'utils/toastPromise'
import { BiImageAdd } from 'react-icons/bi'

const schema = yup
    .object({
        name: yup.string().required('Vui lòng nhập tên sản phẩm'),
        quantity: yup
            .number()
            .positive('Số lượng lớn hơn 0')
            .integer('Số lượng là số nguyên')
            .required()
            .typeError('Vui lòng nhập số lượng sản phẩm'),
        price: yup
            .number()
            .positive('Giá bán lớn hơn 0')
            .required()
            .typeError('Vui lòng nhập giá sản phẩm'),
        description: yup.string().required('Vui lòng nhập mô tả sản phẩm'),
        status: yup.mixed().oneOf(['NEW', 'OLD']).required(),
    })
    .required()

function UpdateProdForm({ onSuccess, info, ...props }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: info.name,
            description: info.description,
            quantity: info.quantity,
            price: info.price,
            image: info.description,
        },
    })

    const onSubmit = async (data) => {
        const fd = appendFormData(data)

        try {
            console.log(data)
            const result = await toastPromise(
                productAPI.updateProduct(fd),
                'Đang cập nhật 🚗 🚓 🚕 '
            )
            console.log(result)
            onSuccess()
        } catch (error) {
            console.log(error)
        }
    }

    const [listCate, setListCate] = useSessionStorage('list_cate', [])

    useEffect(() => {
        try {
            const fetchData = async () => {
                const { data } = await categoryApi.getCategories()
                setListCate(data.data)
            }
            if (listCate.length === 0) {
                fetchData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [listCate, setListCate])

    console.log(errors)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formRow}>
                <NeuInput
                    control={control}
                    rounded='true'
                    {...register('name')}
                    placeholder='Tên sản phẩm'
                    error={errors.name?.message}
                />
                <NeuInput
                    control={control}
                    rounded='true'
                    {...register('quantity')}
                    type='number'
                    placeholder='Kho hàng'
                    error={errors.quantity?.message}
                />
                <NeuInput
                    control={control}
                    rounded='true'
                    {...register('price')}
                    type='number'
                    placeholder='Giá bán'
                    error={errors.price?.message}
                />
            </div>
            <div className={styles.formRow}>
                <Select
                    listName='Danh mục'
                    required
                    {...register('category')}
                    listOption={listCate}
                    error={errors.category?.message}
                />
                <Select
                    {...register('brands')}
                    listName='Thương hiệu'
                    error={errors.brand?.message}
                    listOption={[
                        { _id: 'NEW', display_name: 'APPLE' },
                        { _id: 'OLD', display_name: 'TORANO' },
                    ]}
                />
                <label className={styles.fileUpload}>
                    <input rounded='true' {...register('image')} type='file' />
                    <div className={styles.uploadBtn}>
                        <BiImageAdd />
                    </div>
                </label>
            </div>
            <div className={styles.formRow}>
                <div className={`${styles.previewImg} neu_input textarea`}>
                    <div
                        className={styles.img}
                        style={{ backgroundImage: `url(${info.image_url})` }}
                    ></div>
                </div>
            </div>
            <div className={styles.formRow}>
                <div className={styles.textarea}>
                    <textarea
                        className='neu_input textarea'
                        {...register('description')}
                        spellCheck='false'
                        placeholder='Mô tả sản phẩm'
                        style={{
                            backgroundColor: errors.description
                                ? 'var(--error-bg)'
                                : undefined,
                        }}
                    />
                    {errors.description && (
                        <span style={{ color: 'var(--primary)', fontSize: '1.3rem' }}>
                            {errors?.description?.message}
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.formRow}>
                <Select
                    {...register('status')}
                    error={errors.status?.message}
                    listName='Tình trạng'
                    listOption={[
                        { _id: 'NEW', display_name: 'Mới' },
                        { _id: 'OLD', display_name: 'Cũ' },
                    ]}
                />
                <NeuInput
                    rounded='true'
                    {...register('discount')}
                    type='number'
                    placeholder='Giảm giá'
                    error={errors.discount?.message}
                />
            </div>
            <div className={styles.submit}>
                <NeuButton primary>Cập nhật</NeuButton>
            </div>
        </form>
    )
}

export default UpdateProdForm
