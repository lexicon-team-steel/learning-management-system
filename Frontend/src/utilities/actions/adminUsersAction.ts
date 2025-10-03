import { ActionFunctionArgs, redirect } from 'react-router';
import { FormErrorType, IBasicAction } from '../types';
import { safeFetch } from '../api/safeFetch';
import { BASE_URL } from '../constants';

const validateUser = (formData: FormData, action: string): FormErrorType => {
  const lastName = formData.get('lastName') as string;
  const firstName = formData.get('firstName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors: FormErrorType = {};

  if (!firstName) errors.firstName = 'Förnamn är obligatoriskt';
  if (!lastName) errors.lastName = 'Efternamn är obligatoriskt';

  if (!email || !/.+@.+\..+/.test(email)) errors.email = 'Ogiltig e-postadress';
  if (!password && action === 'create') errors.password = 'Lösenordet är obligatoriskt';
  if (password && password.length < 6) errors.password = 'Lösenordet måste vara minst 6 tecken';

  return errors;
};

export const adminUsersAction = async ({ request }: ActionFunctionArgs): Promise<IBasicAction> => {
  const formData = await request.formData();
  const actionType = formData.get('_action') as string;

  const errors = validateUser(formData, formData.get('_action') as string);

  if (Object.keys(errors).length > 0) {
    return { errors: { fieldErrors: errors } };
  }

  switch (actionType) {
    case 'create': {
      const body = Object.fromEntries(formData.entries());
      const errorResult = await safeFetch(`${BASE_URL}/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (errorResult) return errorResult;
      break;
    }
    default:
      throw new Error(`Unknown action: ${actionType}`);
  }
  redirect('/admin/users');
  return { success: true };
};
