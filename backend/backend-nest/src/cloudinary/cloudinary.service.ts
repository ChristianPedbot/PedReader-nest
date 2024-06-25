import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new Error('No file uploaded');
    }

    const imgBase64 = file.buffer.toString('base64');
    const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${imgBase64}`);

    if (!result || !result.secure_url) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    return result.secure_url;
  }
}
