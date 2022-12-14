import express, { NextFunction, Request, Response } from 'express'
import { User } from '../models/User'
import { BadRequestError, isAuthenticated } from '@vuongtruongnb/common'
import { diskUpload, uploadToCloudinary } from '../utils/uploadImage'
import { removeUndefindedAttrs } from '../utils/removeUndefindAttrs'
import { updateValidator } from '../validators/update-user-validator'

const router = express.Router()

router.patch(
    '/api/users/update',
    isAuthenticated,
    diskUpload.single('avatar'),
    updateValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.user!
            const { full_name, gender, phone, birth_day, province, district, ward } =
                req.body

            const { file } = req
            let address: object | undefined
            let avatar_url: string | undefined

            if (province && district) {
                address = {
                    province: JSON.parse(province),
                    district: district ? JSON.parse(district) : {},
                    ward: ward ? JSON.parse(ward) : {},
                }
            }

            if (file) {
                const result = await uploadToCloudinary(file?.path, {
                    access_mode: 'public',
                    folder: 'avatar',
                    format: 'webp',
                    transformation: { width: 150, height: 150 },
                })
                avatar_url = result?.url
            }

            const newInfo = {
                full_name,
                gender,
                phone,
                birth_day,
                address,
                avatar_url,
            }
            removeUndefindedAttrs(newInfo)

            console.log(newInfo)

            const result = await User.findByIdAndUpdate(
                id,
                {
                    ...newInfo,
                },
                { new: true }
            )

            if (!result) {
                throw new BadRequestError('???? c?? l???i x???y ra, vui l??ng th??? l???i sau')
            }

            res.json({
                success: true,
                message: 'C???p nh???t th??ng tin th??nh c??ng',
                data: result,
            })
        } catch (error) {
            next(error)
        }
    }
)

export { router as updateRouter }
