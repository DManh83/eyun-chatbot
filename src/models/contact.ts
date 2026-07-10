import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"

interface ContactAttributes {
    id: number
    userName: string
    nickName: string | null
    remark: string | null
    signature: string | null
    sex: number | null
    aliasName: string | null
    country: string | null
    bigHead: string | null
    smallHead: string | null
    labelList: string | null
    v1: string | null
    province: string | null
    city: string | null
    v3: string | null
    desc: string | null
    cardImgUrl: string | null
    pyInitial: string | null
    remarkPyInitial: string | null
    phoneNumList: string | null
    createdAt?: Date
    updatedAt?: Date
}

interface ContactCreationAttributes
    extends Optional<
        ContactAttributes,
        | "id"
        | "remark"
        | "signature"
        | "sex"
        | "aliasName"
        | "country"
        | "bigHead"
        | "smallHead"
        | "labelList"
        | "v1"
        | "province"
        | "city"
        | "v3"
        | "desc"
        | "cardImgUrl"
        | "pyInitial"
        | "remarkPyInitial"
        | "phoneNumList"
        | "createdAt"
        | "updatedAt"
    > {}

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
    declare id: number
    declare userName: string
    declare nickName: string | null
    declare remark: string | null
    declare signature: string | null
    declare sex: number | null
    declare aliasName: string | null
    declare country: string | null
    declare bigHead: string | null
    declare smallHead: string | null
    declare labelList: string | null
    declare v1: string | null
    declare province: string | null
    declare city: string | null
    declare v3: string | null
    declare desc: string | null
    declare cardImgUrl: string | null
    declare pyInitial: string | null
    declare remarkPyInitial: string | null
    declare phoneNumList: string | null
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

Contact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            comment: "WeChat ID",
        },
        nickName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        signature: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        sex: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        aliasName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        bigHead: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        smallHead: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        labelList: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        v1: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        province: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        v3: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        desc: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        cardImgUrl: {
            type: DataTypes.STRING(512),
            allowNull: true,
        },
        pyInitial: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        remarkPyInitial: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        phoneNumList: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Contact",
        tableName: "contacts",
        timestamps: true,
    }
)

export default Contact

