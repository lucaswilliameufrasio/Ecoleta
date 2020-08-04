import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

interface IMimeTypeMap {
    [key: string]: string;
}

const MIME_TYPE_MAP: IMimeTypeMap = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};

export default {
    storage: multer.diskStorage({
        destination(req, file, callback) {
            const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

            if (!fs.existsSync(uploadFolder)) {
                fs.mkdirSync(uploadFolder);
            }

            let error = null;

            const isValid = MIME_TYPE_MAP[file.mimetype];

            if (!isValid) {
                error = new Error('Invalid mime type');

                callback(error, uploadFolder);

                return req.res?.json({
                    error: 'Bad request',
                    message: '"image" field only accept jpg, jpeg or png',
                    validation: {
                        source: 'file',
                        keys: ['image'],
                    },
                });
            } else {
                callback(null, uploadFolder);
            }
        },
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');
            const originalFileName = file.originalname.replace(/\s/g, '');

            const fileName = `${hash}-${originalFileName}`;

            callback(null, fileName);
        },
    }),
};
