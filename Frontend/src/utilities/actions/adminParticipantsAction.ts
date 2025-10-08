import { ActionFunctionArgs } from 'react-router';
import { adminEntityAction } from './adminEntityAction';
import { BASE_URL } from '../constants';
import { FormErrorType } from '../types';

export const adminParticipantsAction = (args: ActionFunctionArgs) =>
  adminEntityAction({
    entity: 'participant',
    validate: (): FormErrorType => ({}),
    apiURL: `${BASE_URL}/admin/courses/${args.params.courseId}/participants`,
    redirectURL: `/admin/courses/${args.params.courseId}/participants`,
  })(args);
