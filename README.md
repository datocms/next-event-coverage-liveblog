This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), demonstrating the use of DatoCMS [Real-time Updates API](https://www.datocms.com/docs/real-time-updates-api).

## Final result

Demo here: [https://next-event-coverage-liveblog.vercel.app/](https://next-event-coverage-liveblog.vercel.app/)

![Screenshot](https://raw.githubusercontent.com/datocms/next-event-coverage-liveblog/master/screenshot.gif)

## Deploy this demo project for free!

Click this button to test and deploy this demo project to [Vercel](https://vercel.com/), along with a fully configured DatoCMS project and a Github repo:

[![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=datocms/next-event-coverage-liveblog)

## Learn More

To learn more about how to integrate DatoCMS with your Next.js project, take a look at the following resources:

- [DatoCMS + Next.js Integration Guide](https://www.datocms.com/docs/next-js)
- [How to use DatoCMS Real-time updates API with Next.js](https://www.datocms.com/docs/next-js/real-time-updates)
- [react-datocms](https://github.com/datocms/react-datocms) — A set of React components/hooks that help you integrate DatoCMS with any React project

## Starting the development server

First, create a `.env.local` and put a `NEXT_PUBLIC_DATOCMS_API_TOKEN` env variable containing the API token of your DatoCMS project:

```bash
echo NEXT_PUBLIC_DATOCMS_API_TOKEN=<YOUR_API_TOKEN> > .env.local
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
