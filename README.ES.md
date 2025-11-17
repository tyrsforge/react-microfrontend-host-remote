# React Microfrontend: Host y Remote (Webpack Module Federation)

Este repositorio demuestra una arquitectura mínima de microfrontends construida con:

- React 19
- Webpack 5
- Webpack Module Federation
- React Router
- Dos aplicaciones independientes:
  - `remote/`: una aplicación React independiente que expone un módulo mediante Module Federation
  - `host/`: una aplicación contenedora que consume dinámicamente el módulo remoto en tiempo de ejecución

## Arquitectura

- La aplicación remota se ejecuta en `http://localhost:3001`.
  - Expone el módulo `./RemoteApp`.
  - Sirve el archivo `remoteEntry.js`, que contiene el manifiesto describiendo los módulos expuestos.

- La aplicación host se ejecuta en `http://localhost:3000`.
  - Declara un contenedor remoto llamado `remote` y carga sus módulos de forma dinámica.
  - Renderiza el microfrontend remoto en la ruta `/remote`.
  - Utiliza `React.lazy()` e imports dinámicos para cargar el microfrontend en tiempo de ejecución.

## Scripts

Iniciar solo la aplicación remota:

```bash
pnpm remote:start
```

Iniciar solo la aplicación host:

```bash
pnpm host:start
```

Iniciar ambas aplicaciones simultáneamente:

```bash
pnpm dev
```

## Objetivos

Este proyecto tiene como objetivo proporcionar una comprensión clara y mínima de:

- El funcionamiento de Module Federation en Webpack
- La diferencia entre una aplicación host y una aplicación remota
- Cómo exponer y cargar componentes React entre builds independientes
- Cómo se gestionan dependencias compartidas como React mediante las opciones `singleton` y `eager`
- Cómo integrar microfrontends cargados en tiempo de ejecución dentro de una aplicación principal
