import { adminEntityAction } from './adminEntityAction';
import { BASE_URL } from '../constants';
import { validateFields } from './helpers/validationHelpers';

export const adminCoursesAction = adminEntityAction({
  entity: 'course',
  validate: validateFields,
  apiURL: `${BASE_URL}/admin/courses`,
  redirectURL: '/admin/courses',
});
