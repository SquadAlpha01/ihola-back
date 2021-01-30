const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    const user = this;
    delete user.dataValues.password;
    return user.dataValues;
  }
  generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ email: user.email }, "secret_key");
    await user.save();
    return token;
  };
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        notNull: true,
      },
    },
    image: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: [8],
      },
    },
    status: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

// hashing passwords before saving into db
User.addHook("beforeSave", async (user, options) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});
return User;
}
