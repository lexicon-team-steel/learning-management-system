import { ActionFunctionArgs, redirect } from 'react-router';
import { Action, Entity, FormErrorType, IBasicAction } from '../types';
import { safeFetch } from '../api/safeFetch';

interface IAdminEntityAction {
  entity: Entity;
  validate: (formData: FormData) => FormErrorType;
  apiURL: string;
  redirectURL: string;
}

export const adminEntityAction =
  ({ entity, validate, apiURL, redirectURL }: IAdminEntityAction) =>
  async ({ request }: ActionFunctionArgs): Promise<IBasicAction> => {
    const formData = await request.formData();
    const actionType = formData.get('_action') as Action;

    const errors = validate(formData);
    const response: IBasicAction = { entity, action: actionType };

    if (Object.keys(errors).length > 0) {
      return { ...response, errors: { fieldErrors: errors } };
    }
    const date = formData.get('date') as string | null;
    const startTime = formData.get('startTime') as string | null;
    const endTime = formData.get('endTime') as string | null;

    if (date && startTime && endTime) {
      const startDate = `${date}T${startTime}`;
      const endDate = `${date}T${endTime}`;
      formData.set('startDate', startDate);
      formData.set('endDate', endDate);
      formData.delete('startTime');
      formData.delete('endTime');
      formData.delete('date');
    }
    switch (actionType) {
      case 'create': {
        const body = Object.fromEntries(formData.entries());
        console.log('fetch?');
        console.log(body);

        const errorResult = await safeFetch(apiURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        console.log(errorResult);

        if (errorResult) return { ...response, ...errorResult };

        break;
      }

      default:
        throw new Error(`Unknown action: ${actionType}`);
    }

    redirect(redirectURL);
    return { ...response, success: true };
  };
