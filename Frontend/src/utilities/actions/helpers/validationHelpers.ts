import { FormErrorType } from '../../types';

export const validateNameDescriptionAndDates = (formData: FormData): FormErrorType => {
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
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      errors.startDate = 'Ogiltigt datumformat';
    } else if (end < start) {
      errors.endDate = 'Slutdatum får inte vara före startdatum';
    }
  }

  return errors;
};
