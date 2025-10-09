import { ActionFunctionArgs, redirect } from 'react-router';
import { Action, Entity, FormErrorType, IBasicAction } from '../types';
import { safeFetch } from '../api/safeFetch';

interface IAdminEntityAction {
  entity: Entity;
  validate: (formData: FormData) => FormErrorType;
  apiURL: string;
  redirectURL: string;
}

const makeRequest = async (url: string, method: string, body?: object) => {
  const init: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) init.body = JSON.stringify(body);

  return await safeFetch(url, init);
};

const formatActivityFormData = (formData: FormData) => {
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
  return formData;
};

export const adminEntityAction =
  ({ entity, validate, apiURL, redirectURL }: IAdminEntityAction) =>
  async ({ request }: ActionFunctionArgs): Promise<IBasicAction> => {
    const formData = await request.formData();
    const actionType = formData.get('_action') as Action;
    const response: IBasicAction = { entity, action: actionType };

    if (actionType !== 'delete') {
      const errors = validate(formData);

      if (Object.keys(errors).length > 0) {
        return { ...response, errors: { fieldErrors: errors } };
      }
    }

    formatActivityFormData(formData);
    const body = Object.fromEntries(formData.entries());
    const id = formData.get('id');

    switch (actionType) {
      case 'create': {
        const errorResult = await makeRequest(apiURL, 'POST', body);
        if (errorResult) return { ...response, ...errorResult };
        break;
      }
      case 'update': {
        if (!id) throw new Error('Missing id for update action');
        const errorResult = await makeRequest(`${apiURL}/${id}`, 'PUT', body);

        if (errorResult) return { ...response, ...errorResult };
        break;
      }
      case 'delete': {
        if (!id) throw new Error('Missing id for delete action');
        const errorResult = await makeRequest(`${apiURL}/${id}`, 'DELETE');
        if (errorResult) return { ...response, ...errorResult };
        break;
      }
      default:
        throw new Error(`Unknown action: ${actionType}`);
    }

    redirect(redirectURL);
    return { ...response, success: true };
  };
