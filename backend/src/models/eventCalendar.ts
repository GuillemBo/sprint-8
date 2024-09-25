import { DataTypes } from 'sequelize';
import db from '../db/connection';

const EventCalendar = db.define('eventCalendar', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
});

export default EventCalendar;