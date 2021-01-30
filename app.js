require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const {sequelize} = require('./db/models');
const userRouter = require("./API/user/user.routes");
//const contactRouter = require("./API/contact/contact.routes");
//const chatRouter = require("./API/chat/chat.routes");
const app = express();
const port = process.env.PORT || 3000
 app.use("/user", userRouter);
// app.use("/contact", contactRouter);
// app.use("/chat", chatRouter);


app.listen(port, async () =>{
  console.log(`running on port: ${port}`);
  await sequelize.authenticate();
}
);
