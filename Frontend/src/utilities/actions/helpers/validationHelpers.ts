import { FormErrorType } from '../../types';

export const validateFields = (formData: FormData): FormErrorType => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const activityType = formData.get('activityTypeId') as string;
  const dateStr = formData.get('date') as string;
  const startTimeStr = formData.get('startTime') as string;
  const endTimeStr = formData.get('endTime') as string;
  const startDateStr = formData.get('startDate') as string;
  const endDateStr = formData.get('endDate') as string;

  const errors: FormErrorType = {};

  // --- General fields ---
  if (!name) errors.name = 'Titel är obligatoriskt';
  if (!description) errors.description = 'Beskrivning är obligatorisk';

  // --- Course/Module Fields ---
  if (!startDateStr) errors.startDate = 'Startdatum är obligatoriskt';
  if (!endDateStr) errors.endDate = 'Slutdatum är obligatoriskt';

  if (startDateStr && endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      errors.startDate = 'Ogiltigt datumformat';
    } else if (endDate < startDate) {
      errors.endDate = 'Slutdatum får inte vara före startdatum';
    }
  }

  // --- Activity Fields ---
  if (!dateStr) errors.date = 'Datum är obligatoriskt';
  if (!startTimeStr) errors.startTime = 'Starttid är obligatorisk';
  if (!endTimeStr) errors.endTime = 'Sluttid är obligatorisk';
  if (!activityType) errors.activityType = 'Aktivitetstyp är obligatorisk';

  if (dateStr && startTimeStr && endTimeStr) {
    const start = new Date(`${dateStr}T${startTimeStr}`);
    const end = new Date(`${dateStr}T${endTimeStr}`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      errors.startTime = 'Ogiltigt tidsformat';
    } else if (end <= start) {
      errors.endTime = 'Sluttiden måste vara efter starttiden';
    }
  }

  return errors;
};
