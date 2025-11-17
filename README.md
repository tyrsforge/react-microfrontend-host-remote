# React Microfrontend: Host and Remote (Webpack Module Federation)

This repository demonstrates a minimal microfrontend architecture built with:

- React 19
- Webpack 5
- Webpack Module Federation
- React Router
- Two separate applications:
  - `remote/`: a standalone React application exposing a module via Module Federation
  - `host/`: a shell application that dynamically consumes the remote module at runtime

## Architecture

- The remote application runs on `http://localhost:3001`.
  - It exposes the `./RemoteApp` module.
  - It serves the `remoteEntry.js` file, which contains the manifest describing the exposed modules.

- The host application runs on `http://localhost:3000`.
  - It declares a `remote` container and loads its exposed modules dynamically.
  - It renders the remote microfrontend on the `/remote` route.
  - It uses `React.lazy()` and dynamic imports to load the microfrontend at runtime.

## Scripts

Start only the remote application:

```bash
pnpm remote:start
```

Start only the host application:

```bash
pnpm host:start
```

Start both applications concurrently:

```bash
pnpm dev
```

## Goals

This project aims to provide a clear and minimal understanding of:

- How Module Federation works in Webpack
- The distinction between a host and a remote application
- How to expose and load React components across independent builds
- How shared dependencies like React are handled using `singleton` and `eager` options
- How runtime-loaded microfrontends can be integrated into a parent application
