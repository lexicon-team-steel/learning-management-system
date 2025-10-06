import { ActionFunctionArgs } from 'react-router';
import { FormErrorType, IBasicAction } from '../types';

const validateCourse = (formData: FormData): IBasicAction => {
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
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (startDate > endDate) {
      errors.endDate = 'Slutdatum måste vara efter startdatum';
    }
  }

  return errors;
};

export const adminCoursesAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const errors = validateCourse(formData);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  /* api call */
};
