import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"

interface UserAttributes {
    id: number
    wId: string
    wcId: string | null
    wAccount: string | null
    nickName: string | null
    headUrl: string | null
    sex: number | null
    mobilePhone: string | null
    uin: number | null
    deviceType: string | null
    createdAt?: Date
    updatedAt?: Date
}

interface UserCreationAttributes
    extends Optional<
        UserAttributes,
        "id" | "wcId" | "nickName" | "headUrl" | "sex" | "mobilePhone" | "uin" | "deviceType" | "createdAt" | "updatedAt" | "wAccount" | "wId"
    > {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: number
    declare wId: string
    declare wcId: string | null
    declare wAccount: string | null
    declare nickName: string | null
    declare headUrl: string | null
    declare sex: number | null
    declare mobilePhone: string | null
    declare uin: number | null
    declare deviceType: string | null
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        wId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        wcId: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        wAccount: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        nickName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        headUrl: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        sex: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        mobilePhone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        deviceType: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        uin: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        indexes: [
            {
                name: "idx_wId",
                unique: true,
                fields: ["wId"],
            },
        ],
    }
)

export default User
