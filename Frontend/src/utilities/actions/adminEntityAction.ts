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

    switch (actionType) {
      case 'create': {
        const body = Object.fromEntries(formData.entries());
        const errorResult = await safeFetch(apiURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (errorResult) return { ...response, ...errorResult };
        break;
      }
      default:
        throw new Error(`Unknown action: ${actionType}`);
    }
    redirect(redirectURL);
    return { ...response, success: true };
  };
