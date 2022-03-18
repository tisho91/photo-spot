import multer from 'multer';
import multerS3 from 'multer-s3'
import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const MIME_TYPE_MAP: any = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}
aws.config.update({
    region: process.env.S3_REGION
})

const S3_BUCKET = process.env.S3_BUCKET as string;
const s3 = new aws.S3()
const storage = multerS3({
    s3,
    bucket: S3_BUCKET,
    acl: 'public-read',
    metadata: function (req: any, file: any, cb: any) {
        cb(null, { fieldName: file.fieldname });
    },

    key: function (req: any, file: any, cb: any) {
        const { userId } = req.params;
        const ext = MIME_TYPE_MAP[file.mimetype];
        if (file.fieldname === 'avatar') {
            cb(null, `images/${ userId }/avatar.${ ext }`)
        } else {
            cb(null, `images/${ userId }/${ uuidv4() }.${ ext }`)
        }
    }
})


export const fileUpload = multer({
    storage,
    fileFilter: (req: any, file: any, cb: any) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : 'Not valid file'
        cb(error, isValid)
    },
})


export const fileUploadMultiple = fileUpload.array('images')

