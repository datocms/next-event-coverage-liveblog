import { graphql } from '@/gql';

import { request } from '../lib/datocms';

import RealtimeContent from '../components/RealtimeContent';

const PAGE_CONTENT_QUERY = graphql(`
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
`);

export const metadata = {
  title: 'Create Next App',
};

const getPageContent = async () => {
  return await request({ query: PAGE_CONTENT_QUERY, variables: { limit: 10 } });
};

export default async function Home() {
  const initialData = await getPageContent();

  return (
    <div className="text-gray-700 body-font py-12 bg-gray-100 px-10">
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

      <RealtimeContent
        subscription={{
          query: PAGE_CONTENT_QUERY,
          variables: { limit: 10 },
          initialData,
          token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN!,
        }}
      />
    </div>
  );
}
