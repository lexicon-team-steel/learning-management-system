import { ReactElement, ReactNode, Suspense } from 'react';
import { Await, useLoaderData, useParams } from 'react-router';
import { ICompany, ICompanyLoader } from '../types';

export function Company(): ReactElement {
  const { company } = useLoaderData<ICompanyLoader>();
  const { id } = useParams();

  const renderCompany = (company: ICompany): ReactNode => (
    <article className="company">
      <h3>{company.name}</h3>
    </article>
  );

  return (
    <main className="company">
      <h2>This is the site for one company with {id}</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={company}>{(company) => renderCompany(company)}</Await>
      </Suspense>
    </main>
  );
}
