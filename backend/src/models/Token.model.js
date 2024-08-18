const { DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/dbConfig");
const { UserModel } = require("./User.model");

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    accessToken: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    refreshToken: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    expire: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "token",
  },
);

module.exports = {
  TokenModel: Token,
};
