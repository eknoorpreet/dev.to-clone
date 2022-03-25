const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

const path = require('path');
const { cloudinary } = require('../config/cloudinary');

const uploadToCloudinary = async (file) => {
  try {
    const extName = path.extname(file.originalname).toString();
    const file64 = parser.format(extName, file.buffer);

    const uploadedResponse = await cloudinary.uploader.upload(file64.content, {
      upload_preset: 'devto',
    });
    return uploadedResponse.url;
  } catch (err) {
    console.log(err);
  }
};

exports.uploadToCloudinary = uploadToCloudinary;
