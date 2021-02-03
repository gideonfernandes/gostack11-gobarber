import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

@injectable()
class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(appointment_id: string): Promise<void> {
    await this.appointmentsRepository.delete(appointment_id);
  }
}

export default DeleteAppointmentService;
