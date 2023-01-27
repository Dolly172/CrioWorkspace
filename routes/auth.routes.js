const router = require("express").Router();

const {postSignup} = require("../controllers/auth.controller");
const {postLogin} = require("../controllers/auth.controller");
const { userValidationSchema } = require("../validations/user.validator");
const { validateSchema } = require("../middlewares/validate.middleware");
const {loginBodyValidationSchema} = require("../validations/auth.validator");

const middleware = validateSchema(userValidationSchema);
const middlewareForLogin = validateSchema(loginBodyValidationSchema);

router.post("/signup", middleware, postSignup);
router.post("/login", middlewareForLogin, postLogin);


module.exports = router;