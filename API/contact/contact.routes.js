const router = require("express").Router();
const bodyParser = require("body-parser");
const contactController = require("./contact.controller");
router.use(bodyParser.json());
router.get("/search/:username", contactController.searchContacts);
router.get("/", contactController.getMyChats);
router.post("/:contactid", contactController.addContact);
module.exports = router;