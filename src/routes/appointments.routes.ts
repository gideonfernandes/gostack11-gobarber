import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import appointmentsView from '../views/appointmentsView';

const appointmentRouter = Router();

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json({
    appointments: appointmentsView.renderList(appointments),
  });
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json({ appointment: appointmentsView.render(appointment) });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

appointmentRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  await appointmentsRepository.delete(id);

  return response.json({ message: 'Appointment deleted successfully!' });
});

export default appointmentRouter;
