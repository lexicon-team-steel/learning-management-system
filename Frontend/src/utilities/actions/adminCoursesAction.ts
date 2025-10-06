import { ActionFunctionArgs } from 'react-router';
import { FormErrorType, IBasicAction } from '../types';

const validateCourse = (formData: FormData, action: string): IBasicAction => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  const errors: FormErrorType = {};

  if (!name) errors.name = 'Förnamn är obligatoriskt';
  if (!description) errors.description = 'Efternamn är obligatoriskt';
  if (!startDate) errors.startDate = 'Startdatum är obligatoriskt';
  if (!endDate) errors.endDate = 'Slutdatum är obligatoriskt';
 


  return errors;
};

export const adminCoursesAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log(Object.fromEntries(formData));

  const errors = validateCourse(formData, formData.get('_action') as string);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  /* api call */
};
