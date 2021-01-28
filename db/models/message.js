"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Chat_session }) {
      // define association here
      this.belongsTo(Chat_session, { foreignKey: "chat_session_id" });
    }
  }
  Message.init(
    {
      sender_id: DataTypes.INTEGER,
      chat_session_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      status: DataTypes.STRING,
      sent_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
