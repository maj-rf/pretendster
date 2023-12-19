import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from '../config/config';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import DatauriParser from 'datauri/parser';

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true,
});

const memoryStorage = multer.memoryStorage();
const parser = new DatauriParser();
export const upload = multer({ storage: memoryStorage });

export const uploadToCloud = async (
  fileString: string | undefined,
  format: string,
) => {
  const { uploader } = cloudinary;
  const res = await uploader.upload(
    `data:image/${format};base64,${fileString}`,
  );
  return res;
};

export const deleteFromCloud = async (public_id: string) => {
  const { uploader } = cloudinary;
  const res = uploader.destroy(public_id, function (result) {
    console.log(result);
  });
  return res;
};

export const bufferToDataURI = (fileFormat: string, buffer: Buffer) =>
  parser.format(fileFormat, buffer);
