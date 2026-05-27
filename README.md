<!--datocms-autoinclude-header start-->

<a href="https://www.datocms.com/"><img src="https://www.datocms.com/images/full_logo.svg" height="60"></a>

👉 [Visit the DatoCMS homepage](https://www.datocms.com) or see [What is DatoCMS?](#what-is-datocms)

---

<!--datocms-autoinclude-header end-->

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

First, create a `.env.local` and put a `NEXT_PUBLIC_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN` env variable containing the `CDA Only (Published)` token of your DatoCMS project:

```bash
echo NEXT_PUBLIC_DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN=<YOUR_API_TOKEN> > .env.local
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

<!--datocms-autoinclude-footer start-->

---

# What is DatoCMS?

<a href="https://www.datocms.com/"><img src="https://www.datocms.com/images/full_logo.svg" height="60" alt="DatoCMS - The Headless CMS for the Modern Web"></a>

[DatoCMS](https://www.datocms.com/) is Headless CMS for the modern web. Trusted by 25,000+ businesses, agencies, and individuals, it gives your team one place to manage content and ship it to any website, app, or device via API.

**New here?** Start with [Create free account](https://dashboard.datocms.com/signup) and the [Documentation](https://www.datocms.com/docs). Stuck? Ask the [Community](https://community.datocms.com/). Curious what's new? [Product Updates](https://www.datocms.com/product-updates).

**Building with AI:** [Agent Skills](https://www.datocms.com/docs/agent-skills) turn coding assistants (Claude Code, Cursor) into expert DatoCMS developers, with full read/write via the auto-installed CLI. No local terminal? Use the [MCP Server](https://www.datocms.com/docs/mcp-server) instead.

**Talking to DatoCMS from code:**
- [Content Delivery API](https://www.datocms.com/docs/content-delivery-api) (CDA) — the fast, read-only GraphQL API your website/app uses to **fetch** published content.
- [Content Management API](https://www.datocms.com/docs/content-management-api) (CMA) — the REST API for **creating and updating** content, models, and project settings (think scripts, migrations, integrations).
- [CLI](https://www.datocms.com/docs/scripting-migrations/installing-the-cli) — terminal tool for schema migrations and importing from Contentful/WordPress.

**Framework guides:** end-to-end recipes for fetching content, rendering Structured Text, optimizing images/video, handling SEO, and setting up live preview with visual editing in [Next.js](https://www.datocms.com/docs/next-js), [Nuxt](https://www.datocms.com/docs/nuxt), [Svelte](https://www.datocms.com/docs/svelte), and [Astro](https://www.datocms.com/docs/astro).

**Want a head start?** Browse our [starter projects](https://www.datocms.com/marketplace/starters) — ready-to-deploy example sites for popular frameworks.


<!--datocms-autoinclude-footer end-->
