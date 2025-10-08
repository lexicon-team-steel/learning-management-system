import { BASE_URL } from '../constants';
import { adminEntityAction } from './adminEntityAction';
import { ActionFunctionArgs } from 'react-router';
import { validateFields } from './helpers/validationHelpers';

export const adminModulesAction = (args: ActionFunctionArgs) =>
  adminEntityAction({
    entity: 'module',
    validate: validateFields,
    apiURL: `${BASE_URL}/admin/courses/${args.params.courseId}/modules`,
    redirectURL: `/admin/courses/${args.params.courseId}`,
  })(args);
