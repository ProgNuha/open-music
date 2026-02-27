/* eslint-disable no-undef */
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize storage configuration
const useS3 = process.env.AWS_BUCKET_NAME ? true : false;

let s3Client;
let bucketName;
let uploadPath;

if (useS3) {
  s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  bucketName = process.env.AWS_BUCKET_NAME;
} else {
  // Local storage setup
  uploadPath = path.resolve(__dirname, '../../../uploads');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
}

export const writeFile = async (file, meta) => {
  const filename = `${+new Date()}-${meta.filename}`;

  if (useS3) {
    const parameter = {
      Bucket: bucketName,
      Key: filename,
      Body: file,
      ContentType: meta.headers['content-type'],
      ContentLength: meta.headers['content-length'],
    };

    await s3Client.send(new PutObjectCommand(parameter));
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
  } else {
    const filepath = path.join(uploadPath, filename);

    return new Promise((resolve, reject) => {
      fs.writeFile(filepath, file, (error) => {
        if (error) return reject(error);
        const fileUrl = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/uploads/${filename}`;
        resolve(fileUrl);
      });
    });
  }
};

export const deleteFile = async (fileUrl) => {
  if (useS3) {
    const filename = fileUrl.split('/').pop();
    const parameter = {
      Bucket: bucketName,
      Key: filename,
    };

    await s3Client.send(new DeleteObjectCommand(parameter));
  } else {
    const filename = fileUrl.split('/').pop();
    const filepath = path.join(uploadPath, filename);
    
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }
};

export default {
  writeFile,
  deleteFile,
};