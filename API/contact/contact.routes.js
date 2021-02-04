const router = require("express").Router();
const bodyParser = require("body-parser");
const contactController = require("./contact.controller");

router.use(bodyParser.json());
router.get("/search", contactController.searchContacts);
// router.get("/", contactController.getMyChats);
router.post("/add", contactController.addContact);
module.exports = router;