const { NotExtended } = require('http-errors');
const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const initModels = require('../model/init-models');
const { Users } = initModels(sequelize); 

exports.isAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new console.error("unAuth");
    
    const token = authHeader.split(' ')[1]
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const hasUser = await Users.findOne({ where: { id: decode.userId }})
    req.user = hasUser;
    next();
}