import { LoaderFunctionArgs } from 'react-router';
import { fetchWithToken } from '../api/fetchWithToken';
import { BASE_URL } from '../constants';
import { IActivity, IModule, IModuleLoader } from '../types';

export const moduleLoader = async ({ params }: LoaderFunctionArgs): Promise<IModuleLoader> => {
  if (!params.moduleId) {
    throw new Response('Module ID is required', { status: 400 });
  }

  return {
    module: fetchWithToken<IModule>(`${BASE_URL}/modules/${params.moduleId}`),
    activities: fetchWithToken<IActivity[]>(`${BASE_URL}/modules/${params.moduleId}/activities`),
  };
};
