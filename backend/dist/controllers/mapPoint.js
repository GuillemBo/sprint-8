"use strict";
// controllers/mapPoint.ts
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
exports.deleteMapPoint = exports.updateMapPoint = exports.postMapPoint = exports.getMapPoint = exports.getMapPoints = void 0;
const mapPoint_1 = __importDefault(require("../models/mapPoint"));
// Obtener todos los puntos del mapa
const getMapPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const points = yield mapPoint_1.default.findAll();
        res.json(points);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener los puntos del mapa'
        });
    }
});
exports.getMapPoints = getMapPoints;
// Obtener un punto del mapa por ID
const getMapPoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const point = yield mapPoint_1.default.findByPk(id);
        if (point) {
            res.json(point);
        }
        else {
            res.status(404).json({
                msg: `No existe un punto con el id ${id}`
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener el punto del mapa'
        });
    }
});
exports.getMapPoint = getMapPoint;
// Crear un nuevo punto del mapa
const postMapPoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const newPoint = yield mapPoint_1.default.create(body);
        res.status(201).json({
            msg: 'El punto del mapa fue agregado con éxito',
            newPoint
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear el punto del mapa'
        });
    }
});
exports.postMapPoint = postMapPoint;
// Actualizar un punto del mapa
const updateMapPoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const point = yield mapPoint_1.default.findByPk(id);
        if (point) {
            yield point.update(body);
            res.json({
                msg: 'El punto del mapa fue actualizado con éxito',
                point
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un punto con el id ${id}`
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar el punto del mapa'
        });
    }
});
exports.updateMapPoint = updateMapPoint;
// Eliminar un punto del mapa
const deleteMapPoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const point = yield mapPoint_1.default.findByPk(id);
        if (point) {
            yield point.destroy();
            res.json({
                msg: 'El punto del mapa fue eliminado con éxito'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un punto con el id ${id}`
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el punto del mapa'
        });
    }
});
exports.deleteMapPoint = deleteMapPoint;
