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

  //generate user login token
  generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ email: user.email }, "secret_key");
    user.token=token
    await user.save();
    return token;
  };


  //find user by email and pass
  static findByCredentials = async (email, password) => {
    const user = await User.findOne({  where: { email } })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {

        throw new Error('Unable to login')
    }
    return user
  }

  //Get user by username :: called by contact.searchContacts 
  static findByUsername = async(usernameToSearch)=> {
    var user = await User.findOne({where:{username:usernameToSearch}})
    if (!user){
      return {found:false, user:'User Not Found'};
    }
    user = {
      email: user.email,
      image: user.image,
      status: user.status,
      username: user.username
    }
    return {found:true, user:user}
  }
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
    token: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

// hash passwords before saving into db
User.addHook("beforeSave", async (user, options) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});
return User;
}
