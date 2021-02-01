import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import appointmentsView from '@modules/appointments/infra/views/appointmentsView';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json({
//     appointments: appointmentsView.renderList(appointments),
//   });
// });

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json({ appointment: appointmentsView.render(appointment) });
});

// appointmentRouter.delete('/:id', async (request, response) => {
//   const { id } = request.params;

//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   await appointmentsRepository.delete(id);

//   return response.json({ message: 'Appointment deleted successfully!' });
// });

export default appointmentRouter;
