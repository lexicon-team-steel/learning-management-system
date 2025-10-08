import { adminEntityAction } from './adminEntityAction';
import { BASE_URL } from '../constants';
import { ActionFunctionArgs } from 'react-router';
import { FormErrorType } from '../types';

export const validateActivityForm = (formData: FormData): FormErrorType => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const activityType = formData.get('activityType') as string;
  const dateStr = formData.get('date') as string;
  const startTimeStr = formData.get('startTime') as string;
  const endTimeStr = formData.get('endTime') as string;

  const errors: FormErrorType = {};

  if (!name) errors.name = 'Titel är obligatoriskt';
  if (!description) errors.description = 'Beskrivning är obligatorisk';
  if (!activityType) errors.activityType = 'Beskrivning är obligatorisk';
  if (!dateStr) errors.date = 'Datum är obligatoriskt';
  if (!startTimeStr) errors.startTime = 'Starttid är obligatorisk';
  if (!endTimeStr) errors.endTime = 'Sluttid är obligatorisk';

  if (dateStr && startTimeStr && endTimeStr) {
    const start = new Date(`${dateStr}T${startTimeStr}`);
    const end = new Date(`${dateStr}T${endTimeStr}`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      errors.startTime = 'Ogiltigt tidsformat';
    } else {
      if (end <= start) {
        errors.endTime = 'Sluttiden måste vara efter starttiden';
      }
    }
  }

  return errors;
};

export const adminActivitiesAction = (args: ActionFunctionArgs) =>
  adminEntityAction({
    entity: 'activity',
    validate: validateActivityForm,
    apiURL: `${BASE_URL}/admin/modules/${args.params.moduleId}/activities`,
    redirectURL: `/admin/courses/${args.params.courseId}/modules/${args.params.moduleId}`,
  })(args);
