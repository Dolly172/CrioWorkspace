const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async (request, response) => {
  try {
    const result = await AuthServiceInstance.signup(request.body);
    response.json(result);
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
};

const postLogin = async (request, response) => {
  try {
    const {username, password} = request.body;
    const result = await AuthServiceInstance.login({username, password});
    //console.log(result);
    if(result.isLoggedIn){
      response.cookie("token", result.jwt, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
      return response.json(result);
    } else {
      return response.status(403).json({message: "Invalid Credentials"});
    }  
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }
};

module.exports = { postSignup, postLogin };
