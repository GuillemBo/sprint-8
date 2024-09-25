"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventCalendar_1 = require("../controllers/eventCalendar");
const router = (0, express_1.Router)();
router.get('/', eventCalendar_1.getCalendarEvents);
router.get('/:id', eventCalendar_1.getCalendarEvent);
router.post('/', eventCalendar_1.postCalendarEvent);
router.put('/:id', eventCalendar_1.updateCalendarEvent);
router.delete('/:id', eventCalendar_1.deleteCalendarEvent);
exports.default = router;
