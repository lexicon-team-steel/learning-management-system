import { adminEntityAction } from './adminEntityAction';
import { BASE_URL } from '../constants';
import { ActionFunctionArgs } from 'react-router';
import { validateFields } from './helpers/validationHelpers';


export const adminActivitiesAction = (args: ActionFunctionArgs) =>
  adminEntityAction({
    entity: 'activity',
    validate: validateFields,
    apiURL: `${BASE_URL}/admin/modules/${args.params.moduleId}/activities`,
    redirectURL: `/admin/courses/${args.params.courseId}/modules/${args.params.moduleId}`,
  })(args);
