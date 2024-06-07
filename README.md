# DPP Dashboard repository

This is an example frontend for the DPP Data Repository, built to demonstrate the range of functionalities of the DPP infrastructure.

To run the frontend in dev-mode, follow the default instructions in the next section.

To run a containerized version of the frontend, use the following commands

To build:

```shell
docker build -t dpp-dashboard:latest .
```

To run:

```shell
docker run -it -d -p 80:80 dpp-dashboard
```

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Roadmap

- Develop and reference templates from the Semantic Treehouse API
- Reference local templates for DPP initialization
- CRUD on attachments, credentials in the UI.
- Dynamic Plugin system, based on type of Product. Enable choosing visualization scheme if not auto-selected.
- Enable updating DPP with events, attachments, credentials, integrations.
