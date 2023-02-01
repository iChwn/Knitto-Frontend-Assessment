# Social Bread Assessment
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and tailwind css for the UI library. 

This app is showing a movie lists from IMDB API, it's contain title, description/release date, and plot.
I'm using 2  API from IMDB **`Get Movie By Id`** and **`Get Movie By Id`**, for further information you can visit https://imdb-api.com/. 

The flow is:
When user search the movie using search bar that will use the `Get Movie By Id`, because this api response is not showing all the info that i needed so for the detail info i using `Get Movie By Id` by clicking button inside the card component.

why I'm using IMDB API? because https://themoviedb.org/ is take long time to request the grant access to using their API, but IMDB api is limited use up to 100 request per day so be carefully to test request.


## Getting Started

First how to install and run the development server:
```bash

npm i
#after the installation is complete then run the command below
npm run dev
```

  

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

  

The `pages/api` directory is mapped to `pages/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Atomic Design

This app is using Atomic design Component, thats include Atom, Molecules, Organism you can find it in `/components/*`.

## Unit Test

I'm sorry to inform you that I cannot complete the unit test. I've been struggling for about 2 days now on how to fix the unit test error or configuration I'm afraid of running out of time to fix it. I got some strange errors while setting up the `ts-jest`, but I've been writing some case tests in `/pages/index.test.tsx` and you can run the test via terminal by using this command below.
```bash
npm test
```


Thank you