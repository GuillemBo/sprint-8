"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const MapPoint = connection_1.default.define('MapPoint', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    latitude: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
        allowNull: false
    },
    longitude: {
        type: sequelize_1.DataTypes.DECIMAL(9, 6),
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = MapPoint;
