import { Action, FormErrorType } from '../types';
import { BASE_URL } from '../constants';
import { adminEntityAction } from './adminEntityAction';

const validateUser = (formData: FormData): FormErrorType => {
  const actionType = formData.get('_action') as Action;

  const lastName = formData.get('lastName') as string;
  const firstName = formData.get('firstName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors: FormErrorType = {};

  if (!firstName) errors.firstName = 'Förnamn är obligatoriskt';
  if (!lastName) errors.lastName = 'Efternamn är obligatoriskt';

  if (!email || !/.+@.+\..+/.test(email)) errors.email = 'Ogiltig e-postadress';
  if (!password && actionType === 'create') errors.password = 'Lösenordet är obligatoriskt';
  if (password && password.length < 6) errors.password = 'Lösenordet måste vara minst 6 tecken';

  return errors;
};

export const adminUsersAction = adminEntityAction({
  entity: 'user',
  validate: validateUser,
  apiURL: `${BASE_URL}/admin/users`,
  redirectURL: '/admin/users',
});
