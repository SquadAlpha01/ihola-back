require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./API/user/user.routes");
const contactRouter = require("./API/contact/contact.routes");
const chatRouter = require("./API/chat/chat.routes");
const app = express();

app.use("/user", userRouter);
app.use("/contact", contactRouter);
app.use("/chat", chatRouter);

app.listen(process.env.PORT, () =>
  console.log(`running on port: ${process.env.PORT}`)
);
