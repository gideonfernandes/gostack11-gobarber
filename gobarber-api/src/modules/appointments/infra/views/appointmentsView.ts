import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface AppointmentResponseDTO {
  id: string;
  provider_id: string;
  date: Date;
}

export default {
  render(appointment: Appointment): AppointmentResponseDTO {
    return {
      id: appointment.id,
      provider_id: appointment.provider_id,
      date: appointment.date,
    };
  },

  renderList(appointments: Appointment[]): AppointmentResponseDTO[] {
    return appointments.map(appointment => this.render(appointment));
  },
};
