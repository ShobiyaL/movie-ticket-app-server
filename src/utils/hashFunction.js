const bcrypt = require('bcrypt');

const encryptFunc = async (plaintextPassword)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(plaintextPassword,salt);
    return hashedPwd;
};

const decryptFunc = async (plaintextPassword,hashedPwd)=>{
    const result = await bcrypt.compare(plaintextPassword,hashedPwd);
    return result ? true : false;
}

module.exports = { encryptFunc, decryptFunc };