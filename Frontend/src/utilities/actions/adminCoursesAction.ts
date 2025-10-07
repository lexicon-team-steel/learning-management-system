import { adminEntityAction } from './adminEntityAction';
import { BASE_URL } from '../constants';
import { validateNameDescriptionAndDates } from './helpers/validationHelpers';

export const adminCoursesAction = adminEntityAction({
  entity: 'course',
  validate: validateNameDescriptionAndDates,
  apiURL: `${BASE_URL}/admin/courses`,
  redirectURL: '/admin/courses',
});
