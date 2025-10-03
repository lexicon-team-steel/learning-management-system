import { ActionFunctionArgs } from 'react-router';
import { FormErrorType, IBasicAction } from '../types';

const validateUser = (formData: FormData, action: string): IBasicAction => {
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

export const adminUsersAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const errors = validateUser(formData, formData.get('_action') as string);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  /* api call */
};
