# Vinayaka's Dev Blog (WiP)

This repo hosts the code for my dev blog.

Hosted with Vercel at -- https://dev-blog-five-theta.vercel.app/. (It's $5\theta$!)

Currently, the content there is just a plan for my future articles, they will be replaced when I write some new articles!

## Tech Stack

- [GraphCMS](https://graphcms.com/) in the Content Layer
- [NextJS](https://nextjs.org/) as Static Site Generator
- [TailwindCSS](https://tailwindcss.com/) for styling

## Running

- Create a GraphCMS project with schemas matching the ones defined in [`schema/`](/schema/) and add some content
- Copy `.env.template` to `.env` and add GraphCMS public endpoint in `GRAPHCMS_URL` variable
- `npm install` to install the dependencies
- `npm run dev` to run local dev server

## Adopting the project to your own needs

You are free to adopt this project according to your own needs. Be sure to replace some hard-coded values! (I will be moving them into seperate `constants.ts` in some time)
