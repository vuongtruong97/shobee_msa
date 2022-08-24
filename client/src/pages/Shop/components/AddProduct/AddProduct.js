import React, { useEffect, useState } from 'react'
import styles from './AddProduct.module.scss'

import categoryApi from 'services/category-api/category-api'
import productAPI from 'services/product-api/product-api'
import useSessionStorage from 'hooks/useSessionStorage'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RiDeleteBin2Line } from 'react-icons/ri'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toastPromise from 'utils/toastPromise'
import appendFormData from 'utils/appenFormData'

import { useNavigate } from 'react-router-dom'
import DivStyle1 from 'common-components/UI/Div/DivStyle1'
import Input from 'common-components/UI/Input/Input'
import Select from 'common-components/UI/Select/Select'
import NeuButton from 'common-components/UI/Button/NeuButton'

//validate form schema
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
        category: yup.string().required().typeError('Vui lòng chọn danh mục'),
        description: yup.string().required('Vui lòng nhập mô tả sản phẩm'),
        weight: yup
            .number()
            .positive('Cân nặng lớn hơn 0')
            .integer('Cân nặng là số nguyên')
            .required()
            .typeError('Vui lòng nhập cân nặng sản phẩm'),
        length: yup
            .number()
            .positive('Chiều dài lớn hơn 0')
            .integer('Chiều dài là số nguyên')
            .required()
            .typeError('Vui lòng nhập chiều dài sản phẩm'),
        width: yup
            .number()
            .positive('Chiều rộng lớn hơn 0')
            .integer('Chiều rộng là số nguyên')
            .required()
            .typeError('Vui lòng nhập chiều rộng sản phẩm'),
        height: yup
            .number()
            .positive('Chiều cao lớn hơn 0')
            .integer('Chiều cao là số nguyên')
            .required()
            .typeError('Vui lòng nhập chiều cao sản phẩm'),
        images: yup
            .mixed()
            .required('Bạn phải chọn ít nhất 1 ảnh')
            .test('type', 'File không đúng định dạng(JPEG,PNG,GIF,JPG,jfif)', (value) => {
                return Array.from(value).every((file) =>
                    file.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/)
                )
            })
            .test('fileLength', 'Vui lòng chọn ít nhất 1 hình ảnh', (value) => {
                return value && value.length > 0
            }),
        status: yup.mixed().oneOf(['NEW', 'OLD']).required(),
    })
    .required()

function AddProduct() {
    const navigate = useNavigate()
    const [listCate, setListCate] = useSessionStorage('list_cate', [])
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            category: null,
        },
    })

    const [listImage, setListImage] = useState([0, 0, 0, 0])
    const [editIndex, setEditIndex] = useState()
    const images = watch('images')

    useEffect(() => {
        if (images && images?.length !== 0) {
            let existCount = 0
            const listImg = Array.from(images)
                .map((image) => {
                    const exist = listImage.some((url) => url.name === image.name)
                    if (exist) {
                        existCount += 1
                        return
                    }
                    image.url = URL.createObjectURL(image)
                    return image
                })
                .filter((img) => img !== undefined)

            if (existCount > 0) {
                toast.warn(`Có ${existCount} ảnh trùng lặp`)
            }

            if (listImg.length === 1) {
                listImage.splice(editIndex, 1, listImg[0])
                setListImage([...listImage])
            } else {
                const newListImg = listImage.map((img) => {
                    if (img === 0) {
                        img = listImg.shift() || 0
                    }
                    return img
                })

                if (newListImg.length > 4) {
                    toast.warn('Chỉ đăng tối đa 4 ảnh')
                }
                setListImage(newListImg)
            }
        }
    }, [images])

    const handleAddImg = (index) => {
        setEditIndex(index)
    }

    const handleRemoveImg = (e, i) => {
        e.stopPropagation()
        e.preventDefault()
        URL.revokeObjectURL(listImage[i].url)
        listImage[i] = 0
        setListImage([...listImage])
        setValue('images', '')
    }
    const onSubmit = async (data) => {
        data.list = listImage
        delete data.images
        console.log(data)
        const fd = appendFormData(data)
        try {
            const result = await toastPromise(
                productAPI.createProduct(fd),
                'Đang tạo sản phẩm 🚗 🚓 🚕 '
            )
            if (result.data.success) {
                reset()
                listImage.forEach((img) => {
                    if (img instanceof File) {
                        URL.revokeObjectURL(img.url)
                    }
                })
            }
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

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
            console.log(error)
        }
    }, [listCate, setListCate])

    const specs = watch('specs')

    console.log(specs)
    return (
        <DivStyle1>
            <div className={styles.wrap}>
                <div className={styles.head}>
                    <div>
                        <h3>Thêm 1 sản phẩm mới</h3>
                        <span>
                            Vui lòng chọn ngành hàng phù hợp cho sản phẩm của bạn.
                        </span>
                    </div>
                    <NeuButton
                        primary
                        onClick={() => {
                            navigate(-1)
                        }}
                    >
                        Quay lại trang sản phẩm
                    </NeuButton>
                </div>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.test}>
                        <Input
                            label='Tên sản phẩm'
                            placeholder='Tên sản phẩm'
                            {...register('name')}
                            error={errors.name?.message}
                        />
                    </div>
                    <div className={styles.test}>
                        <Select
                            label='Danh mục'
                            {...register('category')}
                            listOption={listCate}
                            valueField='_id'
                            valueName='display_name'
                            error={errors.category?.message}
                        />
                    </div>
                    <div className={styles.images}>
                        <input
                            id='prodImgs'
                            accept='image/*'
                            type='file'
                            multiple
                            hidden
                            {...register('images')}
                        />
                        <span className={styles.sub_title}>Hình ảnh sản phẩm</span>
                        <h5 className={styles.note}>
                            *Tối đa 4 hình ảnh cho một sản phẩm, hình ảnh sẽ resize về tỉ
                            lệ 1:1 ( 500*500 ),kích thước tối đa mỗi ảnh là 1MB
                        </h5>

                        <div className={styles.list_image}>
                            {listImage.map((label, i) => (
                                <label
                                    key={i}
                                    htmlFor='prodImgs'
                                    className={styles.image_label}
                                    onClick={() => {
                                        handleAddImg(i)
                                    }}
                                >
                                    +
                                    {listImage[i].url && (
                                        <div
                                            style={{
                                                backgroundImage: `url(${listImage[i].url})`,
                                            }}
                                            className={styles.image}
                                        >
                                            <h6
                                                onClick={(e) => {
                                                    handleRemoveImg(e, i)
                                                }}
                                                className={styles.deleteImg}
                                            >
                                                <RiDeleteBin2Line />
                                            </h6>
                                        </div>
                                    )}
                                </label>
                            ))}
                        </div>
                        {errors?.images && (
                            <span className={styles.error}>{errors.images?.message}</span>
                        )}
                    </div>
                    <div className={styles.description}>
                        <span className={styles.sub_title}>Mô tả sản phẩm</span>
                        <Input
                            {...register('description')}
                            textarea
                            error={errors.description?.message}
                        ></Input>
                    </div>
                    <div className={styles.detail}>
                        <div className={styles.test}>
                            <Input
                                {...register('price')}
                                error={errors.price?.message}
                                label='Giá(VNĐ)'
                                type='number'
                                min='0'
                                placeholder='Giá(VNĐ)'
                            />
                        </div>
                        <div className={styles.test}>
                            <Input
                                label='Số lượng sản phẩm'
                                placeholder='Số lượng sản phẩm'
                                {...register('quantity')}
                                type='number'
                                min='1'
                                error={errors.quantity?.message}
                            />
                        </div>
                        <div className={styles.test}>
                            <Input
                                label='Trọng lượng (gram)'
                                {...register('weight')}
                                error={errors.weight?.message}
                                placeholder='Trọng lượng'
                            />
                        </div>
                        <div className={styles.test}>
                            <span className={styles.sub_title}>Kích thước (cm) </span>
                            <Input
                                placeholder='Dài'
                                {...register('length')}
                                type='number'
                                min='1'
                                error={errors.length?.message}
                            />
                            <Input
                                placeholder='Rộng'
                                {...register('width')}
                                type='number'
                                min='1'
                                error={errors.width?.message}
                            />
                            <Input
                                placeholder='Cao'
                                {...register('height')}
                                type='number'
                                min='1'
                                error={errors.height?.message}
                            />
                        </div>

                        <div className={styles.test}>
                            <Select
                                label='Tình trạng'
                                {...register('status')}
                                error={errors.status?.message}
                                listOption={[
                                    { _id: 'NEW', display_name: 'Mới 100% 🌟' },
                                    { _id: 'OLD', display_name: 'Đã qua sử dụng 🛸' },
                                ]}
                                valueField='_id'
                                valueName='display_name'
                            />
                        </div>
                    </div>
                    <div>
                        <NeuButton primary>Tạo sản phẩm</NeuButton>
                    </div>
                </form>
            </div>
        </DivStyle1>
    )
}

export default AddProduct
