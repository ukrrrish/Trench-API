const express = require('express');
const router = express.Router();

const upload = require('../services/imageupload');
const singleUpload= upload.single('image');

router.post('/',(req,res)=>{
singleUpload(req,res,(err)=>{
return res.status(200).json({"imageuploadurl":req.file.location});
});
});
module.exports = router;