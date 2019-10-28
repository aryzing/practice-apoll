import React, { ReactElement, useState } from 'react';
import {
  execute,
  ApolloLink,
  Observable,
  FetchResult,
  from,
} from 'apollo-link';
import gql from 'graphql-tag';

const observer1One = new Observable<FetchResult>(observer => {
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
const link1One = new ApolloLink((_operation, _forward) => {
  return observer1One;
});

// const observer2Two = new Observable<FetchResult>(observer => {
//   const now = `Now is ${Date.now()}`;
//   if (Math.random() < 0.33) {
//     observer.error('Unlucky, error!');
//     observer.complete();
//   }
//   observer.next({
//     data: { now },
//   });

//   setTimeout(() => {
//     observer.next({
//       data: { now: `A bit later: ${now}` },
//     });
//     observer.complete();
//   }, 2000);
// });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const link2Two = new ApolloLink((operation, forward) => {
  return forward(operation).map(data => {
    console.log('Passing through link2Two');
    return data;
  });
});

const dummyRequest = {
  query: gql`
    query {
      dummy
    }
  `,
};

const linkChain2Two1One = from([link2Two, link1One]);

export const App = (): ReactElement => {
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<any>(undefined);

  const setDataToUndefined = (): void => setData(undefined);
  const setDataToFooBar = (): void => setData('foobar');
  const executeLink1One = (): void => {
    execute(link1One, dummyRequest).subscribe({
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
  const executeLink2TwoAnd1One = (): void => {
    execute(linkChain2Two1One, dummyRequest).subscribe({
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
      <button onClick={executeLink1One}>Execute link1One</button>
      <button onClick={executeLink2TwoAnd1One}>
        Execute link2Two and link1One
      </button>
      <h3>Data</h3>
      <pre>{JSON.stringify(data)}</pre>
      <h3>Error</h3>
      <pre>{JSON.stringify(error)}</pre>
    </>
  );
};
