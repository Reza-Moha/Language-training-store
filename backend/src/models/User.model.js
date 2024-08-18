const { DataTypes, Model } = require("@sequelize/core");
const sequelize = require("../config/dbConfig");

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
        profileImage:{
            type:DataTypes.STRING,

        }
    },
    {
        sequelize,
        modelName: "User",
    },
);

module.exports = {
    UserModel : User,
};
