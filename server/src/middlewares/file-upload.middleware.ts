import multer from 'multer';
import multerS3 from 'multer-s3'
import aws from 'aws-sdk';


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
export const fileUpload = multer({
    storage: multerS3({
        s3,
        bucket: S3_BUCKET,
        acl: 'public-read',
        metadata: function (req: any, file: any, cb: any) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req: any, file: any, cb: any) {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, `images/avatar.${ ext }`)
        }
    })
});


// export const fileUploadDev = multer({
//     storage: multer.diskStorage({
//         destination: (req: any, file: any, cb: any) => {
//             cb(null, 'uploads/images')
//
//         },
//         filename: (req, file, cb) => {
//             const ext = MIME_TYPE_MAP[file.mimetype];
//             cb(null, `test.${ ext }`)
//         },
//     })
// });
