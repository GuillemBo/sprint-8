"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCalendarEvent = exports.postCalendarEvent = exports.deleteCalendarEvent = exports.getCalendarEvent = exports.getCalendarEvents = void 0;
const eventCalendar_1 = __importDefault(require("../models/eventCalendar"));
const getCalendarEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventCalendar_1.default.findAll();
        res.json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener los eventos del calendario'
        });
    }
});
exports.getCalendarEvents = getCalendarEvents;
const getCalendarEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const event = yield eventCalendar_1.default.findByPk(id);
    if (event) {
        res.json(event);
    }
    else {
        res.status(404).json({
            msg: `No existe un evento con el id ${id}`
        });
    }
});
exports.getCalendarEvent = getCalendarEvent;
const deleteCalendarEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const event = yield eventCalendar_1.default.findByPk(id);
    if (!event) {
        res.status(404).json({
            msg: `No existe un evento con el id ${id}`
        });
    }
    else {
        yield event.destroy();
        res.json({
            msg: `El producto fue eliminado con éxito`
        });
    }
});
exports.deleteCalendarEvent = deleteCalendarEvent;
const postCalendarEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newEvent = yield eventCalendar_1.default.create(body); // Guardar el evento
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ups, ha ocurrido un error. Comuníquese con soporte.'
        });
    }
});
exports.postCalendarEvent = postCalendarEvent;
const updateCalendarEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const event = yield eventCalendar_1.default.findByPk(id);
        if (event) {
            yield event.update(body);
            res.json({
                msg: `El evento fue actualizado con éxito`
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un evento con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ups, ha ocurrido un error. Comuníquese con soporte.'
        });
    }
});
exports.updateCalendarEvent = updateCalendarEvent;
