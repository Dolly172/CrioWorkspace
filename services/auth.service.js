const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("./user.service");
const UserServiceInstance = new UserService();

class AuthService {

  secret = process.env.JWT_Secret;

  signup = async (userData) => {
    const hashedPassword = await this.hashPassword(userData.password);
    const result = await UserServiceInstance.register({
      ...userData,
      password: hashedPassword,
    });
    //console.log(result);
    return result;
  };

  login = async (data) => {
    const {username, password} = data;
    const user = await UserServiceInstance.findByUsername(username);
    if(!user) {
      return {isLoggedIn: false};
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return {isLoggedIn: false};
    } else {
      return {isLoggedIn: true, jwt: this.generateToken(user._id)};
    }
    
  }

  hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  generateToken = (userId) => {
    const payLoad = {userId};
    const options = {expiresIn: "1h"};
    const token = jwt.sign(payLoad, this.secret, options);      // creates a token
    return token;
  }

}

module.exports = AuthService;
