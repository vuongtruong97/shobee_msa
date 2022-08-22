import { Request } from 'express'
import path from 'path'
import fs from 'fs'
import { v2, UploadApiOptions } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import { BadRequestError } from '@vuongtruongnb/common'

v2.config({
    cloud_name: 'dnpp2nfje',
    api_key: '825988851421863',
    api_secret: 'UcN8RshJ_r-2nn3lE5NgPIEuzk4',
})

function fileFilter(req: Request, file: any, cb: any) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)$/)) {
        cb(
            new BadRequestError(
                'Chỉ chấp nhận file có định dạng (jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|jfif|JFIF)!'
            )
        )
    }
    cb(null, true)
}

const cloudStorage = new CloudinaryStorage({
    cloudinary: v2,
})

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../diskstorage'))
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '.' + Date.now() + '.' + file.originalname.split('.')[1]
        )
    },
})

const uploadDirectToCloud = multer({
    storage: cloudStorage,
    limits: {
        fileSize: 1048576,
    },
    fileFilter,
})

const diskUpload = multer({
    storage: diskStorage,
    limits: { fileSize: 1048576 }, // bit-> 1MB
    fileFilter,
})

async function uploadToCloudinary(locaFilePath: string, options?: UploadApiOptions) {
    try {
        const result = await v2.uploader.upload(locaFilePath, options)
        fs.unlinkSync(locaFilePath)
        return result
    } catch (error) {
        fs.unlinkSync(locaFilePath)
        console.log(error)
    }
}

export { uploadDirectToCloud, diskUpload, v2, uploadToCloudinary }
