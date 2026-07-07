import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../config/database"

interface ProcessedMessageAttributes {
    id: number
    msgId: string
    wId: string
    fromWxId: string
    content: string
    reply: string | null
    createdAt?: Date
    updatedAt?: Date
}

interface ProcessedMessageCreationAttributes extends Optional<ProcessedMessageAttributes, "id" | "reply" | "createdAt" | "updatedAt"> {}

class ProcessedMessage extends Model<ProcessedMessageAttributes, ProcessedMessageCreationAttributes> implements ProcessedMessageAttributes {
    declare id: number
    declare msgId: string
    declare wId: string
    declare fromWxId: string
    declare content: string
    declare reply: string | null
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

ProcessedMessage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        msgId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        wId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fromWxId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        reply: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "ProcessedMessage",
        tableName: "processed_messages",
        timestamps: true,
    }
)

export default ProcessedMessage

