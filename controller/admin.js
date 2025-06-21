const sequelize = require('../db');
const initModels = require('../model/init-models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { uploadFile, getSignedURL } = require('../service/s3');
const { Users } = initModels(sequelize);  

exports.uploadDp = async (req, res, next) => {
    try {
        const { body: { user_name }, file } = req;

        const hasUser = await Users.findOne({ where: { user_name }})
        if(!hasUser) throw new Error("User exiest.");
        const urlPath = `aws/dp/${hasUser_id}`
        const buffer = file.buffer;

        await uploadFile(urlPath, buffer, process.env.AWS_BUCKET_NAME, null, file.mimetype)

        return res.send('ok');
    } catch (error) {
      console.log(error)
    }
}

exports.getDp = async (req, res, next ) => {
  try {
    const { user_name } = req;

    const hasUser = await Users.findOne({ where: { user_name }})
    if(!hasUser) throw new Error("User exiest.");

    const urlPath = `aws/dp/${hasUser.id}`
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
    if (hasUser) throw new Error("User exiest.");

    console.log(password)
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    await Users.create({ user_name, password: hashedPassword });

    res.send('Sign-Up Successfully.')
  } catch (error) {
    next (error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { body: { user_name, password } } = req;

    // validate user
    const hasUser = await Users.findOne({ where: { user_name }, Attributes: ['id', 'password']} );
    if (!hasUser) throw new Error("User not exiest.");

    const match = await bcrypt.compare(String(password), hasUser.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  
    const token = jwt.sign({ userId: hasUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token })
  } catch (error) {
    next(error)
    console.log(error)
  }
} 