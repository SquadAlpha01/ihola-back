"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat_session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Contact_list, Message }) {
      // define association here
      this.hasOne(Contact_list, { foreignKey: "chat_session_id" });
      this.hasMany(Message, { foreignKey: "chat_session_id" });
    }
  }
  Chat_session.init(
    {},
    {
      sequelize,
      modelName: "Chat_session",
    }
  );
  return Chat_session;
};
