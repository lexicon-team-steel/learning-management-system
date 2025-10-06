import { FormErrorType } from '../types';
import { adminEntityAction } from './adminEntityAction';
import { BASE_URL } from '../constants';

const validateCourse = (formData: FormData): FormErrorType => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const startDateStr = formData.get('startDate') as string;
  const endDateStr = formData.get('endDate') as string;

  const errors: FormErrorType = {};

  if (!name) errors.name = 'Titel är obligatoriskt';
  if (!description) errors.description = 'Beskrivning är obligatorisk';
  if (!startDateStr) errors.startDate = 'Startdatum är obligatoriskt';
  if (!endDateStr) errors.endDate = 'Slutdatum är obligatoriskt';

  if (startDateStr && endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (startDate > endDate) {
      errors.endDate = 'Slutdatum måste vara efter startdatum';
    }
  }

  return errors;
};

export const adminCoursesAction = adminEntityAction({
  entity: 'course',
  validate: validateCourse,
  apiURL: `${BASE_URL}/admin/courses`,
  redirectURL: '/admin/courses',
});
