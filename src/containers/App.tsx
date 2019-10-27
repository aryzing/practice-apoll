import React, { ReactElement, useState } from 'react';
import { execute, ApolloLink, Observable, FetchResult } from 'apollo-link';
import gql from 'graphql-tag';

const observerFirst = new Observable<FetchResult>(observer => {
  const now = `Now is ${Date.now()}`;
  if (Math.random() < 0.33) {
    observer.error('Unlucky, error!');
    observer.complete();
  }
  observer.next({
    data: { now },
  });

  setTimeout(() => {
    observer.next({
      data: { now: `A bit later: ${now}` },
    });
    observer.complete();
  }, 2000);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const linkFirst = new ApolloLink((_operation, _forward) => {
  return observerFirst;
});

const dummyOp = {
  query: gql`
    query {
      dummy
    }
  `,
};

export const App = (): ReactElement => {
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<any>(undefined);

  const setDataToUndefined = (): void => setData(undefined);
  const setDataToFooBar = (): void => setData('foobar');
  const executeLinkFirst = (): void => {
    execute(linkFirst, dummyOp).subscribe({
      complete() {
        console.log('Execution completed');
      },
      next(data) {
        setData(data);
        setError(undefined);
      },
      error(err) {
        setData(undefined);
        setError(err);
      },
    });
  };
  return (
    <>
      <h1>Practice Apollo Link</h1>
      <button onClick={setDataToUndefined}>Set `data` to undefined</button>
      <button onClick={setDataToFooBar}>Set `data` to string foobar</button>
      <button onClick={executeLinkFirst}>Execute first link</button>
      <h3>Data</h3>
      <pre>{JSON.stringify(data)}</pre>
      <h3>Error</h3>
      <pre>{JSON.stringify(error)}</pre>
    </>
  );
};
