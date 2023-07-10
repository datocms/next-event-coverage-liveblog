'use client';

import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { Image as DatocmsImage, useQuerySubscription } from 'react-datocms';
import TimeAgo from 'react-timeago';
import ReactMarkdown from 'react-markdown';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Exact, HomePageQuery } from '@/gql/graphql';
import { getFragmentData, graphql } from '@/gql';
import { print } from 'graphql';
import { useEffect, useState } from 'react';

const imageFields = graphql(`
  fragment imageFields on ResponsiveImage {
    aspectRatio
    base64
    height
    sizes
    src
    srcSet
    width
    alt
    title
  }
`);

type Subscription = {
  query: TypedDocumentNode<
    HomePageQuery,
    Exact<{
      limit?: any;
    }>
  >;
  variables: { limit: number };
  initialData: HomePageQuery;
  token: string;
};

export default function RealtimeContent({
  subscription,
}: {
  subscription: Subscription;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const { query, variables, initialData, token } = subscription;
  
  const { data, error, status } = useQuerySubscription({
    query: print(query),
    variables,
    initialData,
    token,
    enabled: true,
  });

  return (
    hydrated && <>
      <div className="max-w-screen-sm mx-auto text-center mt-20 mb-12">
        {status === 'connecting' && <div>Connecting to DatoCMS...</div>}

        {status === 'connected' && (
          <div className="flex flex-col md:flex-row items-center justify-center">
            <span className="flex h-3 w-3 relative mb-3 md:mb-0 md:mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
            <span>Connected to DatoCMS, receiving live updates!</span>
          </div>
        )}

        {status === 'closed' && <div>Connection closed</div>}
      </div>

      {error && (
        <div className="max-w-screen-sm my-12 mx-auto">
          <h1 className="title-font text-lg font-bold text-gray-900 mb-3">
            Error: {error.code}
          </h1>
          <div className="my-5">{error.message}</div>
          {error.response && (
            <pre className="bg-gray-100 p-5 mt-5 font-mono">
              {JSON.stringify(error.response, null, 2)}
            </pre>
          )}
        </div>
      )}

      <div className="max-w-screen-sm mx-auto my-12">
        {data && (
          <TransitionGroup>
            {data.posts.map((post) => (
              <CSSTransition
                key={post.id}
                classNames={{
                  enter: 'post-enter',
                  enterActive: 'post-enter-active',
                  exit: 'post-exit',
                  exitActive: 'post-exit-active',
                }}
                timeout={{ enter: 1200, exit: 1200 }}
              >
                <div>
                  <div className="shadow-xl rounded-lg overflow-hidden bg-white">
                    {post.photos
                      .map((photo) =>
                        getFragmentData(imageFields, photo.responsiveImage),
                      )
                      .map(
                        (photo) =>
                          photo && (
                            <DatocmsImage
                              key={photo.src}
                              className="w-full"
                              data={photo}
                            />
                          ),
                      )}
                    {post.content && (
                      <div className="p-4 md:p-8 md:text-xl content">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-2 text-xs md:text-sm text-gray-500 md:px-8 items-center pb-12">
                    <div className="flex items-center">
                      <div className="w-8 h-8 relative">
                        {post.author.avatar && (
                          <DatocmsImage
                            className="rounded-full mr-2 shadow"
                            layout="fill"
                            data={
                              getFragmentData(
                                imageFields,
                                post.author.avatar.responsiveImage,
                              )!
                            }
                          />
                        )}
                      </div>
                      <div className="pl-2">{post.author.name}</div>
                    </div>
                    <div className="text-right">
                      <TimeAgo date={post._firstPublishedAt} />
                    </div>
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </>
  );
}
