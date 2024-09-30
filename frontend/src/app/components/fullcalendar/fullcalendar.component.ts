import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { FullcalendarService } from '../../services/fullcalendar.service';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent } from '../../interfaces/fullcalendar';

@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './fullcalendar.component.html',
  styleUrl: './fullcalendar.component.scss'
})

export class FullcalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {};

  constructor(private calendarService: FullcalendarService) {}

  ngOnInit(): void {
    this.loadEvents();

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      selectable: true,
      select: this.handleDateSelect.bind(this), 
      events: [],
      eventClick: this.handleEventClick.bind(this),
    };
  }

  loadEvents(): void {
    this.calendarService.getEvents()
      .subscribe((events: CalendarEvent[]) => {
        this.calendarOptions.events = events.map((event: CalendarEvent) => ({
          id: event.id,
          title: event.title,
          date: event.date
        }));
      });
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    const title = prompt('Introduce el título del evento');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent: CalendarEvent = {
        title,
        date: selectInfo.startStr
      };

      this.calendarService.createEvent(newEvent)
        .subscribe((response: CalendarEvent) => {
          // Agregar el evento al calendario con el id generado por el backend
          calendarApi.addEvent({
            id: response.id?.toString(),
            title: response.title,
            start: response.date
          });
          console.log('Evento a agregar:', response);
          this.loadEvents();
        });
    }
}

  handleEventClick(clickInfo: EventClickArg): void {
    const action = prompt('Elige una acción: (E)ditar o (D)elete');

    if (action === 'D' || action === 'd') {
      if (confirm(`¿Estás seguro de que deseas eliminar el evento "${clickInfo.event.title}"?`)) {

        this.calendarService.deleteEvent(Number(clickInfo.event.id))
          .subscribe(() => {
            clickInfo.event.remove();
          });
      }
    } else if (action === 'E' || action === 'e') {
      const newTitle = prompt('Introduce el nuevo título del evento', clickInfo.event.title);
      if (newTitle) {
        const updatedEvent: CalendarEvent = {
          title: newTitle,
          date: clickInfo.event.startStr 
        };

        this.calendarService.updateEvent(Number(clickInfo.event.id), updatedEvent)
          .subscribe(() => {
            clickInfo.event.setProp('title', newTitle);
          });
      }
    }
  }
}
