import { Router } from 'express';
import {} from '../controllers/mapPoint';
import { deleteCalendarEvent, getCalendarEvent, getCalendarEvents, postCalendarEvent, updateCalendarEvent } from '../controllers/eventCalendar';

const router = Router();

router.get('/', getCalendarEvents);
router.get('/:id', getCalendarEvent);
router.post('/', postCalendarEvent);
router.put('/:id', updateCalendarEvent);
router.delete('/:id', deleteCalendarEvent);

export default router;
