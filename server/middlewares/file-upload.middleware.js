const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuid } = require('uuid');
const aws = require('aws-sdk');


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}
aws.config.update({
    region: 'eu-central-1'
})

const S3_BUCKET = process.env.S3_BUCKET || 'photo-spot-storage';
const s3 = new aws.S3()

const fileUpload = multer({
    storage: multerS3({
        s3,
        bucket: S3_BUCKET,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, `images/avatar.${ ext }`)
        }
    })
});

// metadata: function (req, file, cb) {
//     cb(null, {fieldName: file.fieldname});
// },
// filename: (req, file, cb) => {
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, `avatar.${ ext }`)
// },
//     fileFilter: (req, file, cb) => {
//     const isValid = !!MIME_TYPE_MAP[file.mimetype];
//     let error = isValid ? null : 'Greda bro'
//     cb(error, isValid)
// }

module.exports = fileUpload;
