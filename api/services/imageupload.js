const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
 
aws.config.update({
    secretAccessKey:'xGfISR83NhEnK1NsfPXPnk+wgxy9iwnVHtHDYogY',
    accessKeyId:'AKIAI4YHHTPKTBJ3LLXA',
    region:'ap-southeast-1'

});
const s3 = new aws.S3();
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: 'trench-images',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'meta data'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})


module.exports=upload;