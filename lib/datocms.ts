import { cache } from 'react';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from "graphql";

// The `body` argument is expected to be a string:
// it's used by the `cache` function to build a cache key.
const cachedRequest = cache(async ({ body }: { body: string }) => {
  const response = await fetch('https://graphql.datocms.com/', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
    },
    method: 'POST',
    body,
  });

  if (!response.ok) {
    throw new Error(`Failed request ${body}`);
  }

  return await response.json();
});

export const request = async <TResult = unknown, TVariables = unknown>({
  query,
  variables,
}: {
  query: TypedDocumentNode<TResult, TVariables>;
  variables: TVariables;
}): Promise<TResult> => {
  const body = JSON.stringify({ query: print(query), variables });

  const { data } = await cachedRequest({ body });

  return data;
};
