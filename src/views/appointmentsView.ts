import Appointment from '../models/Appointment';

interface ResponseDTO {
  id: string;
  provider_id: string;
  date: Date;
}

export default {
  render(appointment: Appointment): ResponseDTO {
    return {
      id: appointment.id,
      provider_id: appointment.provider_id,
      date: appointment.date,
    };
  },

  renderList(appointments: Appointment[]): ResponseDTO[] {
    return appointments.map(appointment => this.render(appointment));
  },
};
