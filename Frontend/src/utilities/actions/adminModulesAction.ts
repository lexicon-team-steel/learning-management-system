import { BASE_URL } from '../constants';
import { adminEntityAction } from './adminEntityAction';
import { ActionFunctionArgs } from 'react-router';
import { validateNameDescriptionAndDates } from './helpers/validationHelpers';

export const adminModulesAction = ({ params }: ActionFunctionArgs) =>
  adminEntityAction({
    entity: 'module',
    validate: validateNameDescriptionAndDates,
    apiURL: `${BASE_URL}/admin/courses/${params.courseId}/modules`,
    redirectURL: `/admin/courses/${params.courseId}`,
  });
