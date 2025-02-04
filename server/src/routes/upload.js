import multer from 'multer';
import path from 'path';
//var fs = require('fs');  
import dotenv from 'dotenv';
dotenv.config();

//buffer 형태로 저장
const upload = multer({
  storage : multer.memoryStorage() 
});

//multer 이용하여 이미지 업로드
const upload2 = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  //limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;
