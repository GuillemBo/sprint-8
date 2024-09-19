// controllers/mapPoint.ts

import { Request, Response } from 'express';
import MapPoint from '../models/mapPoint';

// Obtener todos los puntos del mapa
export const getMapPoints = async (req: Request, res: Response) => {
    try {
        const points = await MapPoint.findAll();
        res.json(points);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener los puntos del mapa'
        });
    }
};

// Obtener un punto del mapa por ID
export const getMapPoint = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const point = await MapPoint.findByPk(id);
        if (point) {
            res.json(point);
        } else {
            res.status(404).json({
                msg: `No existe un punto con el id ${id}`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener el punto del mapa'
        });
    }
};

// Crear un nuevo punto del mapa
export const postMapPoint = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const newPoint = await MapPoint.create(body);
        res.status(201).json({
            msg: 'El punto del mapa fue agregado con éxito',
            newPoint
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear el punto del mapa'
        });
    }
};

// Actualizar un punto del mapa
export const updateMapPoint = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const point = await MapPoint.findByPk(id);
        if (point) {
            await point.update(body);
            res.json({
                msg: 'El punto del mapa fue actualizado con éxito',
                point
            });
        } else {
            res.status(404).json({
                msg: `No existe un punto con el id ${id}`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar el punto del mapa'
        });
    }
};

// Eliminar un punto del mapa
export const deleteMapPoint = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const point = await MapPoint.findByPk(id);
        if (point) {
            await point.destroy();
            res.json({
                msg: 'El punto del mapa fue eliminado con éxito'
            });
        } else {
            res.status(404).json({
                msg: `No existe un punto con el id ${id}`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el punto del mapa'
        });
    }
};
