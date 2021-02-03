import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAuthenticated);
appointmentRouter.get('/', appointmentsController.index);
appointmentRouter.post('/', appointmentsController.create);
appointmentRouter.delete('/', appointmentsController.delete);

export default appointmentRouter;
