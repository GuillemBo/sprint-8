import { Request, Response } from "express";
import EventCalendar from "../models/eventCalendar";

export const getCalendarEvents = async (req: Request, res: Response) => {
    try {
        const events = await EventCalendar.findAll();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener los eventos del calendario'
        });
    }
}

export const getCalendarEvent = async (req: Request, res: Response) => {
    const { id } = req.params
    const event = await EventCalendar.findByPk(id)

    if (event){
        res.json(event)
    } else {
        res.status(404).json({
            msg: `No existe un evento con el id ${id}`
        })
    }
}

export const deleteCalendarEvent = async (req: Request, res: Response) => {
    const { id } = req.params
    const event = await EventCalendar.findByPk(id)

    if(!event) {
        res.status(404).json({
            msg: `No existe un evento con el id ${id}`
        })
    } else {
        await event.destroy();
        res.json({
            msg: `El producto fue eliminado con éxito`
        })
    }
}

export const postCalendarEvent = async (req: Request, res: Response) => {
    const { body } = req

    try {
        const newEvent = await EventCalendar.create(body);  // Guardar el evento
        res.status(201).json(newEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ups, ha ocurrido un error. Comuníquese con soporte.'
        });
    }
}

export const updateCalendarEvent = async (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    try {
        const event = await EventCalendar.findByPk(id);

        if(event) {
            await event.update(body);
            res.json({
                msg: `El evento fue actualizado con éxito`
            })
        } else {
            res.status(404).json({
                msg: `No existe un evento con el id ${id}`
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ups, ha ocurrido un error. Comuníquese con soporte.'
        });
    }

}