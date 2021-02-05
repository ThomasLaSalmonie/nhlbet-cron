# Gameon feed

Gameon feed API node repository.

It's an API server in node.js based on [koa.js](http://koajs.com/), app developed and maintained by Thomas La Salmonie.

## Environments

- Local: [localhost:3004](http://localhost:3004/)

## Server setup

#### Prerequisites

* Node Stable LTS (`14.15.4` as of writing this)
* Yarn Stable (`1.22.5` as of writing this. [Installation guide](https://yarnpkg.com/en/docs/install)

The easiest way to install Node is to use [nvm](https://github.com/creationix/nvm), which enables you to install multiple `node` versions on the same machine.

Once nvm is installed, run the following command in your terminal:

```sh
nvm install v14 && nvm use 14
```

## Installation

Packages installation from the project root:

```sh
yarn install
```

To start the server :

```sh
yarn dev
```

## Configuration

Visit your [local environment](http://localhost:3004/) to verify the site is running correctly.
