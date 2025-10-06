import { FormErrorType } from '../types';
import { BASE_URL } from '../constants';
import { adminEntityAction } from './adminEntityAction';

const validateCourse = (formData: FormData): FormErrorType => {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  const errors: FormErrorType = {};

  if (!title) errors.title = 'Title är obligatoriskt';
  if (!description) errors.description = 'Beskrivning är obligatoriskt';

  if (!startDate) errors.startDate = 'Startdatum är obligatoriskt';
  if (!endDate) errors.endDate = 'Slutdatum är obligatoriskt';

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      errors.startDate = 'Ogiltigt datumformat';
    } else if (end < start) {
      errors.endDate = 'Slutdatum får inte vara före startdatum';
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
