# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## S3 Deploy

- Run `npm run deploy:mobile` from the repo root to build and sync `mobile/dist` to `s3://msgcause-mobile`.
- Run `npm run deploy:web` from the repo root to build and sync `web/dist` to `s3://msgcause-web`.
- Configure the mobile bucket to serve `index.html` for 404/error responses so `BrowserRouter` routes like `/connect/:guid` work on refresh.
- Build the frontend with `VITE_API_URL` set to your backend origin, for example `https://api.connectcards.live`, so production fetches do not target the static S3 bucket.
- If you change the backend URL later, rebuild and redeploy both apps so the generated client code picks up the new API base.
