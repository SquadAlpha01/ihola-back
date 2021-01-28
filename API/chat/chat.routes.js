const router = require("express").Router();
const bodyParser = require("body-parser");
const chatController = require("./chat.controller");
router.use(bodyParser.json());
router.get("/:contactid", chatController.getChatContact);
module.exports = router;