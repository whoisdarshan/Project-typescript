import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
    destination: function (request: Request, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (request: Request, file, cb) {
      cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`)
    }
})

const upload = multer({storage: storage});
export default upload