const jwt = require('jsonwebtoken')
// for how long the message will be displayed
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '5d',
    });
};

module.exports = generateToken;