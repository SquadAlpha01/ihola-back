const router = require("express").Router();
const bodyParser = require("body-parser");
const userController = require("./user.controller");
const auth=require('../../middlewares/auth')

router.use(bodyParser.json());
router.post("/signup", userController.signUp);
 router.post("/login", userController.login);
 router.get("/logout",auth,userController.logout);
 router.patch("",auth,userController.update);





module.exports = router;