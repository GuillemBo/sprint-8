import { DataTypes } from 'sequelize';
import db from '../db/connection';

const MapPoint = db.define('MapPoint', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default MapPoint;
