const { DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/dbConfig");
const { TokenModel } = require("./Token.model");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    tokenId: {
      type: DataTypes.UUID,
      references: {
        model: TokenModel,
        key: "id",
      },
    },
    userName: DataTypes.STRING,
    fullName: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    otp: {
      type: DataTypes.JSON,
      defaultValue: {
        code: "",
        expiresIn: new Date().getDate() + 60,
      },
    },
    roles: {
      type: DataTypes.JSON,
      defaultValue: [process.env.USER_ROLE],
    },
    profileImage: {
      type: DataTypes.STRING,
    },
    phoneNumberVerify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  },
);
User.belongsTo(TokenModel, {
  foreignKey: "tokenId",
});
module.exports = {
  UserModel: User,
};
