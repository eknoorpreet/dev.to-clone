const jwt = require('jsonwebtoken');
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

const path = require('path');
require('dotenv').config();
const { JWT_KEY } = process.env;
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

const createJWTtoken = (id, email) => {
  let jwtToken;
  try {
    jwtToken = jwt.sign(
      //takes payload (the data you want to encode)
      { userId: id, email: email },
      JWT_KEY,
      { expiresIn: '1h' } //token expires in 1 hr
    );
  } catch (err) {
    console.log(err); //return err ('Signup failed, please try again', 500)
    //'Login failed, please try again', 500)
  }
  return jwtToken;
};

exports.uploadToCloudinary = uploadToCloudinary;
exports.createJWTtoken = createJWTtoken;
