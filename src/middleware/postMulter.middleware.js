import multer from "multer";
import path from 'path';

let storageConfiguration = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(path.resolve(), 'public', 'postImages'));
    },
    filename: (req, file, cb) => {
        let date = Date.now();
        cb(null, `${date}_${file.originalname}`);
    }
})

let uploadPostMiddleware= multer({ storage: storageConfiguration });
export default uploadPostMiddleware;