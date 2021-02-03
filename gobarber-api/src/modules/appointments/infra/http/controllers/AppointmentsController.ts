import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import GetAppointmentsService from '@modules/appointments/services/GetAppointmentsService';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import DeleteAppointmentService from '@modules/appointments/services/DeleteAppointmentService';
import appointmentsView from '@modules/appointments/infra/views/appointmentsView';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getAppointmentsService = container.resolve(GetAppointmentsService);

    const appointments = await getAppointmentsService.execute();

    return response.json({
      appointments: appointmentsView.renderList(appointments),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json({ appointment: appointmentsView.render(appointment) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAppointment = container.resolve(DeleteAppointmentService);
    await deleteAppointment.execute(id);

    return response.json({ message: 'Appointment deleted successfully!' });
  }
}
