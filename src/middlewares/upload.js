import multer from 'multer';
import InvariantError from '../exceptions/invariant-error.js';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 512000, // 512KB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/apng',
      'image/avif', 
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new InvariantError('Tipe file tidak diizinkan. Hanya gambar yang diperbolehkan'));
    }
  },
});

export default upload;
