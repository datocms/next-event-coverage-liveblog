import Head from "next/head";
import { request } from "../lib/datocms";
import { Image, useQuerySubscription } from "react-datocms";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export async function getServerSideProps() {
  const graphqlRequest = {
    query: `
      query HomePage($limit: IntType) {
        posts: allPosts(first: $limit, orderBy:_firstPublishedAt_DESC) {
          id
          content
          _firstPublishedAt
          photos {
            responsiveImage(imgixParams: {auto: [format]}) {
              ...imageFields
            }
          }
          author {
            name
            avatar {
              responsiveImage(imgixParams: {auto: [format], w: 60}) {
                ...imageFields
              }
            }
          }
        }
      }

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
    `,
    variables: { limit: 10 },
  };

  return {
    props: {
      subscription: {
        ...graphqlRequest,
        initialData: await request(graphqlRequest),
        token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
      },
    },
  };
}

export default function Home({ subscription }) {
  const { data, error, status } = useQuerySubscription(subscription);

  return (
    <div className="text-gray-700 body-font py-12 bg-gray-100 px-10">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-screen-sm mx-auto text-center">
        <p className="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">
          Real-times Updates Demo
        </p>
        <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl sm:leading-10">
          Event Coverage LiveBlog
        </h3>
        <p className="mt-4 max-w-xl text-xl leading-7 text-gray-500 lg:mx-auto">
          A simple Next.js + Typescript + Tailwind project to demonstrate
          real-time capabilities of DatoCMS
        </p>
      </div>

      <div className="max-w-screen-sm mx-auto text-center mt-20 mb-12">
        {status === "connecting" ? (
          <div>Connecting to DatoCMS...</div>
        ) : status === "connected" ? (
          <div className="flex flex-col md:flex-row items-center justify-center">
            <span className="flex h-3 w-3 relative mb-3 md:mb-0 md:mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
            <span>Connected to DatoCMS, receiving live updates!</span>
          </div>
        ) : (
          <div>Connection closed</div>
        )}
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
                  enter: "post-enter",
                  enterActive: "post-enter-active",
                  exit: "post-exit",
                  exitActive: "post-exit-active",
                }}
                timeout={{ enter: 1200, exit: 1200 }}
              >
                <div>
                  <div className="shadow-xl rounded-lg overflow-hidden bg-white">
                    {post.photos.map((photo) => (
                      <Image
                        key={photo.responsiveImage.src}
                        className="w-full"
                        data={photo.responsiveImage}
                      />
                    ))}
                    {post.content && (
                      <div className="p-4 md:p-8 md:text-xl content">
                        <ReactMarkdown children={post.content} />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-2 text-xs md:text-sm text-gray-500 md:px-8 items-center pb-12">
                    <div className="flex items-center">
                      <Image
                        className="w-6 h-6 rounded-full mr-2 shadow"
                        data={post.author.avatar.responsiveImage}
                      />
                      <div>{post.author.name}</div>
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
    </div>
  );
}
