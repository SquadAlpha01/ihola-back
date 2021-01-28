"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Contact_list }) {
      // define association here
      this.hasMany(Contact_list, { foreignKey: "owner" });
      this.hasOne(Contact_list, { foreignKey: "contact_id" });
    }
    toJSON() {
      //returns
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.STRING,
      username: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
