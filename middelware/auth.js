const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const initModels = require('../model/init-models');
const { Users } = initModels(sequelize); 

const isAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
       const err = new Error('Unauthorized access');
        return next(err);
    } 
    
    const token = authHeader.split(' ')[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    const hasUser = await Users.findOne({ where: { id: decode.userId }})
    req.user = hasUser;
    next();
}

module.exports = {
    isAuth
}