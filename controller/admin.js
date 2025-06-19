const sequelize = require('../db');
const initModels = require('../model/init-models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { uploadFile, getSignedURL } = require('../service/s3');
const { Users } = initModels(sequelize);  

exports.uploadDp = async (req, res, next) => {
    try {
        const { body: { name }, file } = req;

        const urlPath = `aws/dp/${name}/${file.originalname}`
        const buffer = file.buffer;

        // await uploadFile(urlPath, buffer, process.env.AWS_BUCKET_NAME, null, file.mimetype)

        return res.send('ok');
    } catch (error) {
      console.log(error)
    }
}

exports.getDp = async (req, res, next ) => {
  try {
    const urlPath = `aws/dp/shrutin/Screenshot (1).png`
    const signedUrl = await getSignedURL(urlPath, process.env.AWS_BUCKET_NAME);

    return res.send(signedUrl)
  } catch (error) {
    console.log(error)
  }
}

exports.signUp = async (req, res, next) => {
  try {
    const { body: { user_name, password } } = req;

    //validate user exiest
    const hasUser = await Users.findOne({ where: { user_name }, Attributes: ['id']} );
    if (hasUser) throw new Error("User exiest.") 

    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({ user_name, hashedPassword });

    res.send('Sign-Up Successfully.')
  } catch (error) {
    next (error)
  }
}